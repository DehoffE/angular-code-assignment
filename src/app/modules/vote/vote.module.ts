import { NgModule } from "@angular/core";
import { VoteGridComponent } from "./components/vote-grid/vote-grid.component";
import { VoteCardComponent } from "./components/vote-card/vote-card.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ApiMockService } from "../../data-access/api-mock.service";
import { VoteService } from "./services/vote/vote.service";
import { CategoriesFilterComponent } from "./components/categories-filter/categories-filter.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    VoteGridComponent,
    VoteCardComponent,
    CategoriesFilterComponent,
    CategoriesFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiMockService,
    VoteService
  ],
  exports: [
    VoteGridComponent,
    VoteCardComponent
  ]
})
export class VoteModule {}
