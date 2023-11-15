import { Component, Input } from "@angular/core";
import { PollCard } from "../../services/vote/types";

@Component({
  selector: 'app-vote-card',
  templateUrl: 'vote-card.component.html',
  styleUrls: ['vote-card.component.scss']
})
export class VoteCardComponent {
  @Input() poll!: PollCard;
}
