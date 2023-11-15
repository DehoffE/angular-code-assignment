import { Injectable } from "@angular/core";
import { VoteModule } from "../../vote.module";
import { ApiMockService } from "../../../../data-access/api-mock.service";
import { combineLatest, map, Observable } from "rxjs";
import { CategoryMeta, Poll, PollCategory } from "../../../../data-access/types";
import { PollCard } from "./types";

@Injectable({
  providedIn: VoteModule
})
export class VoteService {
  constructor(private readonly apiMockService: ApiMockService) {}

  loadAllPolls(): Observable<PollCard[]> {
    const categories$ = this.apiMockService.getCategories();
    const categoriesMeta$ = this.apiMockService.getCategoriesMeta();
    const polls$ = this.apiMockService.getPolls();

    return combineLatest(
      [categories$, categoriesMeta$, polls$]
    ).pipe(
      map<[PollCategory[], CategoryMeta[], Poll[]], PollCard[]>(
        ([ categories, categoriesMeta, polls]): PollCard[] =>
          this.mapPollsToPollCards(polls, categories, categoriesMeta)))
  }

  loadPollsByCategoryId(categoryId: number): Observable<PollCard[]> {
    return this.loadAllPolls().pipe(
      map((pollCards) => pollCards.filter(pollCard => pollCard.categoryId === categoryId))
    )
  }

  loadCategories(): Observable<PollCategory[]> {
    return this.apiMockService.getCategories();
  }

  private mapPollsToPollCards(polls: Poll[], categories: PollCategory[], categoriesMeta: CategoryMeta[]): PollCard[] {
    const result: PollCard[] = [];

    for (let i = 0; i < polls.length; i++) {
      const poll = polls[i];
      const pollCategory = categories.find(category => category.id === poll.category_id);
      const categoryMeta = categoriesMeta.find(categoryMeta => pollCategory ? pollCategory.alias === categoryMeta.alias : false);

      if (pollCategory && categoryMeta) {
        result.push({
          title: poll.title,
          categoryName: pollCategory.name,
          categoryId: poll.category_id,
          votersCount: poll.voters_count,
          points: poll.points,
          bgColor: categoryMeta.backgroundColor,
          textColor: categoryMeta.textColor,
          imageUrl: poll.image,
          iconUrl: categoryMeta.smallIcon
        })
      }
    }

    return result;
  }
}
