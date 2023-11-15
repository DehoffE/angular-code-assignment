import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Subject, take, takeUntil } from "rxjs";
import { VoteService } from "../../services/vote/vote.service";
import { PollCard } from "../../services/vote/types";
import { PollCategory } from "../../../../data-access/types";
import { CategoriesFilterValueItem } from "../categories-filter/types";

function mapPollCategoriesToCategoryFilters(categories: PollCategory[]): CategoriesFilterValueItem[] {
  return categories.map(category => ({
    label: category.name,
    value: category.id
  }));
}

@Component({
  selector: 'app-vote-grid',
  templateUrl: 'vote-grid.component.html',
  styleUrls: ['vote-grid.component.scss']
})
export class VoteGridComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();
  polls$ = new Subject<PollCard[]>();
  categories$ = new BehaviorSubject<CategoriesFilterValueItem[]>([]);

  constructor(private readonly voteService: VoteService) {}

  ngOnInit() {
    this.getAllPolls();
    this.getVoteCategories();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onChangeFilter(filter: CategoriesFilterValueItem): void {
    filter.value === null ? this.getAllPolls() : this.getPollsByCategoryId(filter.value);
  }

  private getAllPolls(): void {
    this.voteService
      .loadAllPolls()
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe(polls => {
        this.polls$.next(polls);
      });
  }

  private getPollsByCategoryId(categoryId: number): void {
    this.voteService
      .loadPollsByCategoryId(categoryId)
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe(polls => {
        this.polls$.next(polls);
      });
  }

  private getVoteCategories(): any {
    this.voteService
      .loadCategories()
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((categories) => {
        this.categories$.next(mapPollCategoriesToCategoryFilters(categories));
      });
  }
}
