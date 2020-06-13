import {PerformancePhraseModel} from "./performance-phrase.model";
import {UserModel} from "./user.model";

export class EmployeeToReview {
	id: number;
	reviewed: number;
	reviewedUser: UserModel;
    reviewedBy: number;
    reviewedByUser: UserModel;
	performancePhraseId: number;
	performancePhrase: PerformancePhraseModel;
	details: string;
	star: number;
	createdAt: string;
	updatedAt: string;

	constructor() {
		this.id = undefined;
		this.reviewed = undefined;
		this.reviewedUser = new UserModel();
		this.reviewedBy = undefined;
		this.reviewedByUser = new UserModel();
		this.performancePhraseId = undefined;
		this.performancePhrase = new PerformancePhraseModel();
		this.details = '';
		this.star = undefined;
		this.createdAt = '';
		this.updatedAt = '';
	}
}
