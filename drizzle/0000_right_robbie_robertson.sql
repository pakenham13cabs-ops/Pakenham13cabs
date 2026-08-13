CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`service` text DEFAULT '' NOT NULL,
	`vehicle` text DEFAULT '' NOT NULL,
	`pickup` text NOT NULL,
	`dropoff` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`passengers` integer DEFAULT 1 NOT NULL,
	`flight` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`notification_status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_reference_unique` ON `bookings` (`reference`);