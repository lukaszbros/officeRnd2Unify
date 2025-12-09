/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(6);
const axios_1 = __webpack_require__(7);
const schedule_1 = __webpack_require__(8);
const api_scheduler_service_1 = __webpack_require__(9);
const auth_service_1 = __webpack_require__(16);
const unify_service_1 = __webpack_require__(11);
const user_service_1 = __webpack_require__(10);
const rnd_service_1 = __webpack_require__(15);
const memory_logger_service_1 = __webpack_require__(5);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), axios_1.HttpModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            api_scheduler_service_1.ApiSchedulerService,
            auth_service_1.OfficerndAuthService,
            rnd_service_1.RndService,
            unify_service_1.UnifyService,
            user_service_1.UserService,
            memory_logger_service_1.MemoryLoggerService,
        ],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const memory_logger_service_1 = __webpack_require__(5);
let AppController = class AppController {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    logs() {
        return this.logger
            .getLogs()
            .map((log) => {
            const d = new Date(log.timestamp);
            const pad = (n) => n.toString().padStart(2, '0');
            const formatted = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
            return `[${log.level}] ${formatted}: ${log.message}`;
        })
            .join('<br/>');
    }
    webhook(req) {
        const rawBody = req.rawBody;
        console.log(rawBody);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "logs", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "webhook", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof memory_logger_service_1.MemoryLoggerService !== "undefined" && memory_logger_service_1.MemoryLoggerService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemoryLoggerService = void 0;
const common_1 = __webpack_require__(3);
let MemoryLoggerService = class MemoryLoggerService {
    MAX_ENTRIES = 1000;
    logs = [];
    log(message, context) {
        this.addLog('log', message, context);
    }
    error(message, trace, context) {
        this.addLog('error', `${message} ${trace ?? ''}`, context);
    }
    warn(message, context) {
        this.addLog('warn', message, context);
    }
    debug(message, context) {
        this.addLog('debug', message, context);
    }
    verbose(message, context) {
        this.addLog('verbose', message, context);
    }
    addLog(level, message, context) {
        const entry = { level, message, context, timestamp: new Date() };
        this.logs.push(entry);
        if (this.logs.length > this.MAX_ENTRIES) {
            this.logs.splice(0, this.logs.length - this.MAX_ENTRIES);
        }
        const prefix = context ? `[${context}]` : '';
        console[level](`[${entry.timestamp.toISOString()}] ${prefix} ${message}`);
    }
    getLogs() {
        return [...this.logs];
    }
    clear() {
        this.logs = [];
    }
};
exports.MemoryLoggerService = MemoryLoggerService;
exports.MemoryLoggerService = MemoryLoggerService = __decorate([
    (0, common_1.Injectable)()
], MemoryLoggerService);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ApiSchedulerService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiSchedulerService = void 0;
const common_1 = __webpack_require__(3);
const schedule_1 = __webpack_require__(8);
const user_service_1 = __webpack_require__(10);
const rnd_service_1 = __webpack_require__(15);
let ApiSchedulerService = ApiSchedulerService_1 = class ApiSchedulerService {
    rndService;
    userService;
    INTERVAL = 60 * 1000;
    logger = new common_1.Logger(ApiSchedulerService_1.name);
    lastCall = new Date();
    constructor(rndService, userService) {
        this.rndService = rndService;
        this.userService = userService;
        this.logger.log('Scheduler started');
    }
    async callExternalApi() {
        this.logger.log('Get office rnd user changes');
        const callTime = new Date();
        try {
            const changedUsers = await this.rndService.getChangedUser(this.lastCall);
            if (changedUsers && changedUsers.length > 0) {
                for (const user of changedUsers) {
                    await this.userService.processUser(user);
                }
            }
            this.lastCall = callTime;
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
};
exports.ApiSchedulerService = ApiSchedulerService;
__decorate([
    (0, schedule_1.Interval)(60000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiSchedulerService.prototype, "callExternalApi", null);
exports.ApiSchedulerService = ApiSchedulerService = ApiSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof rnd_service_1.RndService !== "undefined" && rnd_service_1.RndService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], ApiSchedulerService);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UserService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(3);
const unify_service_1 = __webpack_require__(11);
const rnd_service_1 = __webpack_require__(15);
const fs_1 = __importDefault(__webpack_require__(18));
const path_1 = __importDefault(__webpack_require__(19));
let UserService = UserService_1 = class UserService {
    rndService;
    unifyService;
    logger = new common_1.Logger(UserService_1.name);
    membershipMap = [];
    constructor(rndService, unifyService) {
        this.rndService = rndService;
        this.unifyService = unifyService;
        this.logger.log('User service started');
    }
    onModuleInit() {
        this.logger.log('Initialising');
        this.loadMembrshiopMap();
    }
    loadMembrshiopMap() {
        const mapPath = path_1.default.join(process.cwd(), 'membership_map.json');
        try {
            const raw = fs_1.default.readFileSync(mapPath, 'utf8');
            this.membershipMap = JSON.parse(raw);
            this.logger.log(`Loaded membership_map.json from ${mapPath}`);
        }
        catch (err) {
            this.logger.error(`Failed to load membership_map.json: ${err?.message ?? err}`);
        }
    }
    async processUser(user) {
        this.logger.log('Procerss user');
        const parts = user.name.trim().split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        let uuser = await this.unifyService.getUserByEmail(user.email);
        if (uuser) {
            this.logger.log('User exists');
        }
        else {
            const newUser = {
                first_name: firstName,
                last_name: lastName,
                user_email: user.email,
            };
            uuser = await this.unifyService.createUser(newUser);
        }
        this.logger.log('Check membership');
        const rndMemberships = await this.rndService.getUserMemberships(user._id);
        this.logger.log(`Found rnd memberships ${JSON.stringify(rndMemberships)}`);
        const rndPlans = Array.from(new Set(rndMemberships?.map((m) => m.plan)));
        this.logger.log(`Found rnd plans ${JSON.stringify(rndPlans)}`);
        const mappedPlans = rndPlans
            .flatMap((plan) => this.membershipMap.filter((m) => m.rndId === plan))
            .filter((p) => p !== null);
        this.logger.log(`Mapped plans ${JSON.stringify(mappedPlans, null, 2)}`);
        const mappedUPlanIds = mappedPlans.map((p) => p.uid);
        this.logger.log('Update plans');
        this.logger.log(`RND: ${JSON.stringify(mappedUPlanIds, null, 2)}`);
        this.logger.log(`Unify: ${JSON.stringify(uuser?.access_policy_ids, null, 2)}`);
        console.log(uuser, mappedUPlanIds, mappedUPlanIds.length > 0);
        if (uuser &&
            mappedUPlanIds &&
            mappedUPlanIds.length > 0 &&
            JSON.stringify(mappedUPlanIds) !== JSON.stringify(uuser.access_policy_ids)) {
            await this.unifyService.assignUserAccessPolicy(uuser?.id, mappedUPlanIds);
        }
        else {
            this.logger.log('Plans are the same no update needed');
        }
        this.logger.log('User processed');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof rnd_service_1.RndService !== "undefined" && rnd_service_1.RndService) === "function" ? _a : Object, typeof (_b = typeof unify_service_1.UnifyService !== "undefined" && unify_service_1.UnifyService) === "function" ? _b : Object])
], UserService);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UnifyService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnifyService = void 0;
const common_1 = __webpack_require__(3);
const axios_1 = __webpack_require__(7);
const https_1 = __importDefault(__webpack_require__(12));
const rxjs_1 = __webpack_require__(13);
const minimist_1 = __importDefault(__webpack_require__(14));
let UnifyService = UnifyService_1 = class UnifyService {
    http;
    unifyApiPath = 'https://192.168.1.190:12445/api/v1/developer';
    queryConfig = {
        headers: {
            Authorization: 'Bearer +XcfKDKadTzPpAUB+M20NA',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }),
    };
    logger = new common_1.Logger(UnifyService_1.name);
    nounify = false;
    sim = false;
    noConnection = false;
    users = [];
    accessPolicies = [];
    constructor(http) {
        this.http = http;
        this.logger.log('Unify started');
    }
    async onModuleInit() {
        this.logger.log('Initialising');
        const args = (0, minimist_1.default)(process.argv.slice(2));
        this.sim = args['sim'] === true || args['sim'] === 'true' ? true : false;
        await this.getUsers();
        await this.fetchAccessPolicies();
    }
    async getUsers() {
        this.logger.log('Loading users');
        try {
            if (this.noConnection) {
                this.logger.log('Users loaded(sim) 0');
            }
            else {
                const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.unifyApiPath}/users?age_num=1&page_size=25`, this.queryConfig));
                this.users = response.data.data;
                this.logger.log(`Users loaded ${response.data.data.length}`);
            }
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
    async getUserByEmail(email) {
        const mappedUser = this.users.find((u) => u.user_email === email);
        if (!mappedUser) {
            this.logger.warn('No user found');
            return;
        }
        try {
            if (this.noConnection) {
                this.logger.log('Users not loaded (sim)');
            }
            else {
                const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.unifyApiPath}/users/${mappedUser.id}?expand[]=access_policy`, this.queryConfig));
                this.logger.log(`Users loaded ${JSON.stringify(response.data.data, null, 2)}`);
                return response.data.data;
            }
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
    async createUser(user) {
        this.logger.log('Create user');
        try {
            if (this.sim) {
                this.logger.log('User created (sim)', user);
            }
            else {
                const response = await (0, rxjs_1.lastValueFrom)(this.http.post(`${this.unifyApiPath}/users`, user, this.queryConfig));
                this.logger.log('User created');
                this.users.push(response.data.data);
                return response.data.data;
            }
        }
        catch (error) {
            this.logger.error('Error:', error.message);
        }
    }
    async fetchAccessPolicies() {
        this.logger.log('Loading access_policies');
        try {
            if (this.noConnection) {
                this.logger.log('Access_policies loaded (sim) 0');
            }
            else {
                const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.unifyApiPath}/access_policies?page_num=1&page_size=25`, this.queryConfig));
                this.accessPolicies = response.data.data;
                this.logger.log(`Access_policies loaded ${response.data.data.length}`);
            }
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
    async assignUserAccessPolicy(userId, accessPolicyIds) {
        this.logger.log('Assign policies to user');
        try {
            if (this.sim) {
                this.logger.log(`Assing ${userId} access_policy_ids ${JSON.stringify(accessPolicyIds, null, 2)}`);
            }
            else {
                await (0, rxjs_1.lastValueFrom)(this.http.put(`${this.unifyApiPath}/users/${userId}/access_policies`, { access_policy_ids: accessPolicyIds }, this.queryConfig));
                this.logger.log('User policies assingned');
                return true;
            }
        }
        catch (error) {
            this.logger.error('Error:', error.message);
        }
    }
};
exports.UnifyService = UnifyService;
exports.UnifyService = UnifyService = UnifyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], UnifyService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("https");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("minimist");

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RndService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RndService = void 0;
const axios_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(16);
const rxjs_1 = __webpack_require__(13);
let RndService = RndService_1 = class RndService {
    http;
    officerndAuthService;
    logger = new common_1.Logger(RndService_1.name);
    API_PATH = 'https://app.officernd.com/api/v2/organizations/yolkkrakow';
    constructor(http, officerndAuthService) {
        this.http = http;
        this.officerndAuthService = officerndAuthService;
        this.logger.log('Scheduler started');
    }
    async onModuleInit() {
        await this.officerndAuthService.getToken();
    }
    async getChangedUser(lastCall) {
        this.logger.log('Get changed users');
        const token = await this.officerndAuthService.getToken();
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.API_PATH}/members?modifiedAt[$gte]=${lastCall.toISOString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));
            this.logger.log(`API response ${JSON.stringify(response.data.results)}`);
            return response.data.results;
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
    async getUserMemberships(memberId) {
        this.logger.log(`Get member ${memberId} membership`);
        const token = await this.officerndAuthService.getToken();
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.API_PATH}/memberships?member=${memberId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }));
            return response.data.results.flatMap((membership) => membership);
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
    async getPlan(planId) {
        this.logger.log(`Get plan ${planId}`);
        const token = await this.officerndAuthService.getToken();
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.API_PATH}/plans/${planId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }));
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to call API', error.message);
        }
    }
};
exports.RndService = RndService;
exports.RndService = RndService = RndService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.OfficerndAuthService !== "undefined" && auth_service_1.OfficerndAuthService) === "function" ? _b : Object])
], RndService);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OfficerndAuthService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficerndAuthService = void 0;
const common_1 = __webpack_require__(3);
const axios_1 = __webpack_require__(7);
const rxjs_1 = __webpack_require__(13);
const qs = __importStar(__webpack_require__(17));
let OfficerndAuthService = OfficerndAuthService_1 = class OfficerndAuthService {
    http;
    logger = new common_1.Logger(OfficerndAuthService_1.name);
    accessToken = null;
    expiresAt = null;
    constructor(http) {
        this.http = http;
    }
    async fetchNewToken() {
        const url = 'https://identity.officernd.com/oauth/token';
        const data = {
            client_secret: 'iiUT7kr0OxXEAN0Qlz9FKBJkvpRDe9e5',
            client_id: '7WCHj7WOpiZUKKpe',
            grant_type: 'client_credentials',
            scope: 'flex.community.members.read flex.community.memberships.read',
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const response = await (0, rxjs_1.firstValueFrom)(this.http.post(url, qs.stringify(data), { headers }));
        const { access_token, expires_in } = response.data;
        this.accessToken = access_token;
        this.expiresAt = Date.now() + expires_in * 1000 - 60_000;
        this.logger.log(`New Officernd token fetched, expires in ${expires_in}s`);
    }
    async getToken() {
        if (!this.accessToken || !this.expiresAt || Date.now() >= this.expiresAt) {
            await this.fetchNewToken();
        }
        return this.accessToken;
    }
    async get(url) {
        const token = await this.getToken();
        const response = await (0, rxjs_1.firstValueFrom)(this.http.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
};
exports.OfficerndAuthService = OfficerndAuthService;
exports.OfficerndAuthService = OfficerndAuthService = OfficerndAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], OfficerndAuthService);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("qs");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const memory_logger_service_1 = __webpack_require__(5);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { rawBody: true });
    const memoryLogger = app.get(memory_logger_service_1.MemoryLoggerService);
    app.useLogger(memoryLogger);
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

})();

/******/ })()
;