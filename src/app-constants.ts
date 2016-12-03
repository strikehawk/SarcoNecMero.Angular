﻿module adunware.snm {
	export class AppConstants {

		public static get CORE_MODULE_NAME(): string {
			return "adunware.snm";
		}

		public static get APP_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".app";
		}

		public static get COMPONENTS_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".components";
		}

		public static get PAGES_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".pages";
		}

		public static get SERVICES_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".services";
		}

		public static get OPS_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".ops";
		}

		public static get APP_INSTANCE(): string {
			return "app-instance";
		}
	}
}