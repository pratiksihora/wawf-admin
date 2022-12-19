export const ROUTE_CONSTANTS = {
	MAIN_ROUTE: '',
	BLANK_ROUTE: '',
	//=========== Error ==========
	ERROR: 'error',

	// ========== Authorize =========
	AUTHORIZE: 'authorize',
	UNAUTHORIZED: 'unauthorized',
	FORBIDDEN: 'forbidden',
	VERIFIED: 'verified',

	// ========== Global =========
	MY: 'my',
	BUSINESSES: 'businesses',
	CREATE_BUSINESS: 'create-business',
	ACCEPT_INVITE: 'invite/:bs_id/:ub_invite_token',
	INVITE: 'invite',

	//=========== Auth ===========
	AUTH2: 'auth2',
	AUTH: 'auth',
	LOGIN: 'signin',
	LOGIN_FULL: 'auth/signin',
	REGISTER: 'register',
	REGISTER_FULL: 'auth/register',
	FORGOT_PASSWORD: 'forgot-password',
	FORGOT_PASSWORD_FULL: 'auth/forgot-password',
	RESET_PASSWORD: 'reset-password/:token',
	RESET_PASSWORD_FULL: 'auth/reset-password/:token',

	//=========== Business ===========
	BUSINESS_MAIN_ROUTE: ':bs_id',
	CHOOSE_WORKSPACE: 'choose-workspace',
	CONFIGURE: 'configure',
	ACCOUNT: 'account',
	DASHBOARD: 'dashboard',
	WORKSPACES: 'workspaces',
	TEAM: 'team',
	ROLE: 'role',
	BILLING: 'billing',
	SETTING: 'setting',

	//=========== Workspace ===========
	WORKSPACE: 'workspace/:ws_id',
	W_DASHBOARD: 'dashboard',
	W_CAMPAIGNS: 'campaigns',
	CHOOSE_CAMPAIGN_GAME: 'choose-game',
	CHOOSE_CAMPAIGN_TEMPLATE: 'choose-template',
	CAMPAIGN: 'campaign/:cmp_id',
	EDITOR: 'campaign/:cmp_id/editor',
	EDITOR_OLD: 'campaign/:cmp_id/editor-old',
	W_GALLERY: 'gallery',
	W_INTEGRATIONS: 'integrations',
	W_TEAM: 'team',


	//=========== Campaign ===========
	STATISTICS: 'statistics',
	RESULT: 'result',
	PUBLISH: 'publish',
	GENERAL_SETTING: 'general-setting',
	OPTIN_FORM: 'optin-form',
	CLAIM_FORM: 'claim-form',
	REWARD: 'reward',
	VALIDATION: 'validation',
	INTEGRATION: 'integration',
	SHARING_OPTIONS: 'sharing-options',
	ANTI_FRAUD: 'anti-fraud',
	ADVANCE: 'advance',
	ACCESS_CODE: 'access-code',
	CAMPAIGN_EDITOR: 'workspaces/campaign/editor',

	//============= Campaign Integration ================
	WEBHOOK: 'webhook',

	//=========== APP ===========
	// Dashboard

	BUILDER: 'builder',
	// Workspace

	WORKSPACE_DETAIL: 'workspace/:ws_id',

	// Dashboard <== Workspace
	WS_DASHBAORD: 'dashboard',
	WS_DASHBAORD_FULL: 'workspace/:ws_id/dashboard',

	// Campaign <== Workspace
	CAMPAIGN_FULL: 'workspace/:ws_id/campaigns',
	CAMPAIGN_DETAIL: 'campaign/:cmp_id',
	CAMPAIGN_DETAIL_FULL: 'workspace/:ws_id/campaign/:cmp_id',
	CAMPAIGN_OVERVIEW: 'overview',
	CAMPAIGN_OVERVIEW_FULL: 'workspace/:ws_id/campaign/:cmp_id/overview',

	// User
	USER: 'users',
	USER_DETAIL: 'user/:user_id',

	ROLE_DETAIL: 'role/:role_id',

	// Profile
	PROFILE: 'profile'
}

