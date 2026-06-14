PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`github_user` text,
	`rating` text NOT NULL,
	`runner` text NOT NULL,
	`details` text NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_reports`("id", "app_id", "github_user", "rating", "runner", "details", "date") SELECT "id", "app_id", "github_user", "rating", "runner", "details", "date" FROM `reports`;--> statement-breakpoint
DROP TABLE `reports`;--> statement-breakpoint
ALTER TABLE `__new_reports` RENAME TO `reports`;--> statement-breakpoint
PRAGMA foreign_keys=ON;