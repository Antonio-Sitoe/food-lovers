ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "price_in_cents";