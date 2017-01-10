module snm {
	export class AppConstants {

		public static get CORE_MODULE_NAME(): string {
			return "snm";
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

		public static get MAPS_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".maps";
		}

		public static get OPS_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".ops";
		}

		public static get PERS_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".pers";
		}

		public static get CHRONO_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".chrono";
		}

		public static get SARCOS_MODULE_NAME(): string {
			return this.CORE_MODULE_NAME + ".sarcos";
		}
	}
}