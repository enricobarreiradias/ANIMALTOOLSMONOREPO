/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/admin/src/animal/animal.controller.ts":
/*!****************************************************!*\
  !*** ./apps/admin/src/animal/animal.controller.ts ***!
  \****************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnimalController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const animal_service_1 = __webpack_require__(/*! ./animal.service */ "./apps/admin/src/animal/animal.service.ts");
const create_animal_dto_1 = __webpack_require__(/*! ./dto/create-animal.dto */ "./apps/admin/src/animal/dto/create-animal.dto.ts");
const update_animal_dto_1 = __webpack_require__(/*! ./dto/update-animal.dto */ "./apps/admin/src/animal/dto/update-animal.dto.ts");
let AnimalController = class AnimalController {
    animalService;
    constructor(animalService) {
        this.animalService = animalService;
    }
    create(createAnimalDto) {
        return this.animalService.create(createAnimalDto);
    }
    findAll() {
        return this.animalService.findAll();
    }
    findOne(id) {
        return this.animalService.findOne(+id);
    }
    update(id, updateAnimalDto) {
        return this.animalService.update(+id, updateAnimalDto);
    }
    remove(id) {
        return this.animalService.remove(+id);
    }
};
exports.AnimalController = AnimalController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: (__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal) }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animal_dto_1.CreateAnimalDto]),
    __metadata("design:returntype", void 0)
], AnimalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal)] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_animal_dto_1.UpdateAnimalDto]),
    __metadata("design:returntype", void 0)
], AnimalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimalController.prototype, "remove", null);
exports.AnimalController = AnimalController = __decorate([
    (0, common_1.Controller)('animal'),
    __metadata("design:paramtypes", [animal_service_1.AnimalService])
], AnimalController);


/***/ }),

/***/ "./apps/admin/src/animal/animal.module.ts":
/*!************************************************!*\
  !*** ./apps/admin/src/animal/animal.module.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnimalModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const animal_service_1 = __webpack_require__(/*! ./animal.service */ "./apps/admin/src/animal/animal.service.ts");
const animal_controller_1 = __webpack_require__(/*! ./animal.controller */ "./apps/admin/src/animal/animal.controller.ts");
const animal_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts");
let AnimalModule = class AnimalModule {
};
exports.AnimalModule = AnimalModule;
exports.AnimalModule = AnimalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([animal_entity_1.Animal])],
        controllers: [animal_controller_1.AnimalController],
        providers: [animal_service_1.AnimalService],
        exports: [animal_service_1.AnimalService],
    })
], AnimalModule);


/***/ }),

/***/ "./apps/admin/src/animal/animal.service.ts":
/*!*************************************************!*\
  !*** ./apps/admin/src/animal/animal.service.ts ***!
  \*************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnimalService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const animal_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts");
let AnimalService = class AnimalService {
    animalRepository;
    constructor(animalRepository) {
        this.animalRepository = animalRepository;
    }
    create(createAnimalDto) {
        const animal = this.animalRepository.create(createAnimalDto);
        return this.animalRepository.save(animal);
    }
    findAll() {
        return this.animalRepository.find();
    }
    findOne(id) {
        return this.animalRepository.findOneBy({ id });
    }
    async update(id, updateAnimalDto) {
        await this.animalRepository.update(id, updateAnimalDto);
        return this.findOne(id);
    }
    remove(id) {
        return this.animalRepository.delete(id);
    }
};
exports.AnimalService = AnimalService;
exports.AnimalService = AnimalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(animal_entity_1.Animal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnimalService);


/***/ }),

/***/ "./apps/admin/src/animal/dto/create-animal.dto.ts":
/*!********************************************************!*\
  !*** ./apps/admin/src/animal/dto/create-animal.dto.ts ***!
  \********************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAnimalDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateAnimalDto {
    tagCode;
    breed;
    animalIdentifier;
    static _OPENAPI_METADATA_FACTORY() {
        return { tagCode: { required: true, type: () => String }, breed: { required: true, type: () => String }, animalIdentifier: { required: false, type: () => String } };
    }
}
exports.CreateAnimalDto = CreateAnimalDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "tagCode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "breed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "animalIdentifier", void 0);


/***/ }),

/***/ "./apps/admin/src/animal/dto/update-animal.dto.ts":
/*!********************************************************!*\
  !*** ./apps/admin/src/animal/dto/update-animal.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAnimalDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_animal_dto_1 = __webpack_require__(/*! ./create-animal.dto */ "./apps/admin/src/animal/dto/create-animal.dto.ts");
class UpdateAnimalDto extends (0, swagger_1.PartialType)(create_animal_dto_1.CreateAnimalDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAnimalDto = UpdateAnimalDto;


/***/ }),

/***/ "./apps/admin/src/app.module.ts":
/*!**************************************!*\
  !*** ./apps/admin/src/app.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const path_1 = __webpack_require__(/*! path */ "path");
const evaluation_module_1 = __webpack_require__(/*! ./evaluation/evaluation.module */ "./apps/admin/src/evaluation/evaluation.module.ts");
const animal_module_1 = __webpack_require__(/*! ./animal/animal.module */ "./apps/admin/src/animal/animal.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../..', 'uploads'),
                serveRoot: '/uploads',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? '5432', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [__dirname + '/../../libs/data/src/entities/*.entity.{ts,js}'],
                synchronize: true,
                autoLoadEntities: true,
            }),
            evaluation_module_1.EvaluationModule,
            animal_module_1.AnimalModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./apps/admin/src/evaluation/evaluation.controller.ts":
/*!************************************************************!*\
  !*** ./apps/admin/src/evaluation/evaluation.controller.ts ***!
  \************************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const evaluation_service_1 = __webpack_require__(/*! ./evaluation.service */ "./apps/admin/src/evaluation/evaluation.service.ts");
let EvaluationController = class EvaluationController {
    evaluationService;
    constructor(evaluationService) {
        this.evaluationService = evaluationService;
    }
    async create(createEvaluationDto) {
        return await this.evaluationService.create(createEvaluationDto);
    }
    async uploadAnimal(files, body) {
        const baseUrl = 'http://localhost:3333';
        const frontalPath = files.frontal
            ? `${baseUrl}/uploads/${files.frontal[0].filename}`
            : null;
        const vestibularPath = files.vestibular
            ? `${baseUrl}/uploads/${files.vestibular[0].filename}`
            : null;
        return await this.evaluationService.createAnimalFromUpload(body.code, body.breed, [frontalPath, vestibularPath].filter(Boolean));
    }
    async findPending() {
        return await this.evaluationService.findPendingEvaluations();
    }
    async findHistory(page, limit) {
        return await this.evaluationService.findAllHistory(page, limit);
    }
    async seed() {
        return await this.evaluationService.seed();
    }
    async dashboard() {
        return await this.evaluationService.getDashboardStats();
    }
    async findByAnimal(idOrTag) {
        return await this.evaluationService.findHistoryByAnimal(idOrTag);
    }
    async findOne(id) {
        return await this.evaluationService.findOne(+id);
    }
    async update(id, updateEvaluationDto) {
        return await this.evaluationService.update(+id, updateEvaluationDto);
    }
    async remove(id) {
        return await this.evaluationService.remove(+id);
    }
};
exports.EvaluationController = EvaluationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 201, type: (__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation) }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload-animal'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'frontal', maxCount: 1 },
        { name: 'vestibular', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    openapi.ApiResponse({ status: 201, type: (__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal) }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "uploadAnimal", null);
__decorate([
    (0, common_1.Get)('pending'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)('history'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findHistory", null);
__decorate([
    (0, common_1.Get)('seed'),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "dashboard", null);
__decorate([
    (0, common_1.Get)('animal/:idOrTag'),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation)] }),
    __param(0, (0, common_1.Param)('idOrTag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findByAnimal", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation) }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation) }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation) }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "remove", null);
exports.EvaluationController = EvaluationController = __decorate([
    (0, common_1.Controller)('evaluations'),
    __metadata("design:paramtypes", [evaluation_service_1.EvaluationService])
], EvaluationController);


/***/ }),

/***/ "./apps/admin/src/evaluation/evaluation.module.ts":
/*!********************************************************!*\
  !*** ./apps/admin/src/evaluation/evaluation.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const evaluation_service_1 = __webpack_require__(/*! ./evaluation.service */ "./apps/admin/src/evaluation/evaluation.service.ts");
const evaluation_controller_1 = __webpack_require__(/*! ./evaluation.controller */ "./apps/admin/src/evaluation/evaluation.controller.ts");
const dental_evaluation_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const tooth_evaluation_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/tooth-evaluation.entity */ "./libs/data/src/entities/tooth-evaluation.entity.ts");
const animal_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/user.entity */ "./libs/data/src/entities/user.entity.ts");
const media_entity_1 = __webpack_require__(/*! ../../../../libs/data/src/entities/media.entity */ "./libs/data/src/entities/media.entity.ts");
let EvaluationModule = class EvaluationModule {
};
exports.EvaluationModule = EvaluationModule;
exports.EvaluationModule = EvaluationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                dental_evaluation_entity_1.DentalEvaluation,
                tooth_evaluation_entity_1.ToothEvaluation,
                animal_entity_1.Animal,
                user_entity_1.User,
                media_entity_1.Media
            ])
        ],
        controllers: [evaluation_controller_1.EvaluationController],
        providers: [evaluation_service_1.EvaluationService],
    })
], EvaluationModule);


/***/ }),

/***/ "./apps/admin/src/evaluation/evaluation.service.ts":
/*!*********************************************************!*\
  !*** ./apps/admin/src/evaluation/evaluation.service.ts ***!
  \*********************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const dental_evaluation_entity_1 = __webpack_require__(/*! @app/data/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const tooth_evaluation_entity_1 = __webpack_require__(/*! @app/data/entities/tooth-evaluation.entity */ "./libs/data/src/entities/tooth-evaluation.entity.ts");
const animal_entity_1 = __webpack_require__(/*! @app/data/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts");
const user_entity_1 = __webpack_require__(/*! @app/data/entities/user.entity */ "./libs/data/src/entities/user.entity.ts");
const media_entity_1 = __webpack_require__(/*! @app/data/entities/media.entity */ "./libs/data/src/entities/media.entity.ts");
const dental_evaluation_enums_1 = __webpack_require__(/*! @app/data/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
let EvaluationService = class EvaluationService {
    evaluationRepository;
    toothRepository;
    animalRepository;
    userRepository;
    mediaRepository;
    dataSource;
    constructor(evaluationRepository, toothRepository, animalRepository, userRepository, mediaRepository, dataSource) {
        this.evaluationRepository = evaluationRepository;
        this.toothRepository = toothRepository;
        this.animalRepository = animalRepository;
        this.userRepository = userRepository;
        this.mediaRepository = mediaRepository;
        this.dataSource = dataSource;
    }
    async create(createDto) {
        const animalIdNumber = Number(createDto.animalId);
        const animal = await this.animalRepository.findOne({
            where: { id: animalIdNumber }
        });
        if (!animal)
            throw new common_1.NotFoundException(`Animal não encontrado.`);
        let evaluator = await this.userRepository.findOne({
            where: { id: createDto.evaluatorId }
        });
        if (!evaluator) {
            evaluator = await this.userRepository.findOne({ order: { registrationDate: 'ASC' } });
        }
        if (!evaluator)
            throw new common_1.NotFoundException(`Nenhum avaliador encontrado.`);
        const evaluation = this.evaluationRepository.create({
            animal: animal,
            evaluator: evaluator,
            generalObservations: createDto.notes || '',
            evaluationDate: new Date()
        });
        const savedEvaluation = await this.evaluationRepository.save(evaluation);
        if (createDto.teeth && Array.isArray(createDto.teeth)) {
            for (const toothData of createDto.teeth) {
                const tooth = this.toothRepository.create({
                    evaluation: savedEvaluation,
                    toothCode: toothData.toothCode,
                    toothType: toothData.toothType || dental_evaluation_enums_1.ToothType.PERMANENT,
                    isPresent: toothData.isPresent !== false,
                    crownReductionLevel: toothData.crownReductionLevel || dental_evaluation_enums_1.SeverityScale.NONE,
                    lingualWear: toothData.lingualWear || dental_evaluation_enums_1.SeverityScale.NONE,
                    gingivalRecessionLevel: toothData.gingivalRecessionLevel || dental_evaluation_enums_1.SeverityScale.NONE,
                    periodontalLesions: toothData.periodontalLesions || dental_evaluation_enums_1.SeverityScale.NONE,
                    fractureLevel: toothData.fractureLevel || dental_evaluation_enums_1.SeverityScale.NONE,
                    pulpitis: toothData.pulpitis || dental_evaluation_enums_1.SeverityScale.NONE,
                    vitrifiedBorder: toothData.vitrifiedBorder || dental_evaluation_enums_1.SeverityScale.NONE,
                    pulpChamberExposure: toothData.pulpChamberExposure || dental_evaluation_enums_1.SeverityScale.NONE,
                    gingivitisEdema: toothData.gingivitisEdema || dental_evaluation_enums_1.SeverityScale.NONE,
                    gingivitisColor: toothData.gingivitisColor || dental_evaluation_enums_1.ColorScale.NORMAL,
                    dentalCalculus: toothData.dentalCalculus || dental_evaluation_enums_1.SeverityScale.NONE,
                    abnormalColor: toothData.abnormalColor || dental_evaluation_enums_1.ColorScale.NORMAL,
                    caries: toothData.caries || dental_evaluation_enums_1.SeverityScale.NONE,
                });
                await this.toothRepository.save(tooth);
            }
        }
        else {
            await this.createDefaultHealthyTeeth(savedEvaluation);
        }
        return this.findOne(savedEvaluation.id);
    }
    async findPendingEvaluations() {
        const animals = await this.animalRepository.find({
            relations: ['dentalEvaluations', 'mediaFiles'],
            order: { id: 'DESC' },
            take: 50
        });
        return animals
            .filter(a => a.dentalEvaluations.length === 0)
            .map(a => ({
            id: a.id.toString(),
            code: a.tagCode,
            breed: a.breed,
            farm: a.farm,
            client: a.client,
            entryDate: a.collectionDate ? new Date(a.collectionDate).toLocaleDateString('pt-BR') : new Date(a.registrationDate).toLocaleDateString('pt-BR'),
            media: a.mediaFiles?.map(m => m.s3UrlPath) || []
        }));
    }
    async findAllHistory(page = 1, limit = 10) {
        const [evaluations, total] = await this.evaluationRepository.findAndCount({
            relations: ['animal', 'mediaFiles', 'teeth'],
            order: { id: 'DESC' },
            skip: (page - 1) * limit,
            take: limit
        });
        return {
            data: evaluations.map(ev => {
                const maxFracture = ev.teeth?.length
                    ? Math.max(...ev.teeth.map(t => t.fractureLevel))
                    : 0;
                const isCritical = ev.teeth?.some(t => t.fractureLevel >= dental_evaluation_enums_1.SeverityScale.SEVERE ||
                    t.pulpitis >= dental_evaluation_enums_1.SeverityScale.SEVERE ||
                    t.gingivalRecessionLevel >= dental_evaluation_enums_1.SeverityScale.SEVERE);
                return {
                    id: ev.id.toString(),
                    animalId: ev.animal.id.toString(),
                    code: ev.animal.tagCode,
                    breed: ev.animal.breed,
                    lastEvaluationDate: ev.evaluationDate,
                    media: ev.mediaFiles?.map(m => m.s3UrlPath) || [],
                    worstFracture: maxFracture,
                    isCritical: isCritical
                };
            }),
            meta: { total, page, limit }
        };
    }
    async findOne(id) {
        const evaluation = await this.evaluationRepository.findOne({
            where: { id },
            relations: ['animal', 'evaluator', 'mediaFiles', 'teeth'],
        });
        if (!evaluation) {
            throw new common_1.NotFoundException(`Avaliação #${id} não encontrada.`);
        }
        return evaluation;
    }
    async update(id, updateDto) {
        const evaluation = await this.findOne(id);
        if (updateDto.notes !== undefined) {
            evaluation.generalObservations = updateDto.notes;
        }
        await this.evaluationRepository.save(evaluation);
        if (updateDto.teeth && Array.isArray(updateDto.teeth)) {
            for (const t of updateDto.teeth) {
                const tooth = await this.toothRepository.findOne({
                    where: { evaluation: { id: id }, toothCode: t.toothCode }
                });
                if (tooth) {
                    if (t.toothType !== undefined)
                        tooth.toothType = t.toothType;
                    if (t.fractureLevel !== undefined)
                        tooth.fractureLevel = t.fractureLevel;
                    if (t.lingualWear !== undefined)
                        tooth.lingualWear = t.lingualWear;
                    if (t.crownReductionLevel !== undefined)
                        tooth.crownReductionLevel = t.crownReductionLevel;
                    if (t.gingivalRecessionLevel !== undefined)
                        tooth.gingivalRecessionLevel = t.gingivalRecessionLevel;
                    if (t.pulpitis !== undefined)
                        tooth.pulpitis = t.pulpitis;
                    if (t.dentalCalculus !== undefined)
                        tooth.dentalCalculus = t.dentalCalculus;
                    if (t.caries !== undefined)
                        tooth.caries = t.caries;
                    if (t.abnormalColor !== undefined)
                        tooth.abnormalColor = t.abnormalColor;
                    if (t.gingivitisColor !== undefined)
                        tooth.gingivitisColor = t.gingivitisColor;
                    await this.toothRepository.save(tooth);
                }
            }
        }
        return this.findOne(id);
    }
    async remove(id) {
        const evaluation = await this.findOne(id);
        return await this.evaluationRepository.remove(evaluation);
    }
    async findHistoryByAnimal(animalIdOrTag) {
        const isId = !isNaN(Number(animalIdOrTag));
        const query = this.evaluationRepository.createQueryBuilder('evaluation')
            .leftJoinAndSelect('evaluation.animal', 'animal')
            .leftJoinAndSelect('evaluation.mediaFiles', 'media')
            .leftJoinAndSelect('evaluation.evaluator', 'evaluator')
            .leftJoinAndSelect('evaluation.teeth', 'teeth');
        if (isId) {
            query.where('animal.id = :id', { id: animalIdOrTag });
        }
        else {
            query.where('animal.tagCode = :tag', { tag: animalIdOrTag });
        }
        return await query.orderBy('evaluation.evaluationDate', 'DESC').getMany();
    }
    async getDashboardStats() {
        const totalAnimals = await this.animalRepository.count();
        const totalEvaluations = await this.evaluationRepository.count();
        const pendingList = await this.findPendingEvaluations();
        const criticalQuery = this.evaluationRepository.createQueryBuilder('eval')
            .innerJoin('eval.teeth', 'tooth')
            .where('tooth.fracture_level >= :level', { level: dental_evaluation_enums_1.SeverityScale.SEVERE })
            .orWhere('tooth.pulpitis >= :level', { level: dental_evaluation_enums_1.SeverityScale.SEVERE })
            .orWhere('tooth.gingival_recession_level >= :level', { level: dental_evaluation_enums_1.SeverityScale.SEVERE });
        const criticalCases = await criticalQuery.getCount();
        return {
            totalAnimals,
            totalEvaluations,
            pendingEvaluations: pendingList.length,
            criticalCases,
        };
    }
    async createAnimalFromUpload(code, breed, mediaPaths, details) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const animalPayload = {
                tagCode: code,
                breed: breed,
                farm: details?.farm,
                client: details?.client,
                location: details?.location,
                collectionDate: details?.collectionDate || new Date(),
                age: details?.age || 24,
            };
            const newAnimal = this.animalRepository.create(animalPayload);
            const savedAnimal = await queryRunner.manager.save(newAnimal);
            for (const [index, path] of mediaPaths.entries()) {
                const mediaPayload = {
                    s3UrlPath: path,
                    photoType: index === 0 ? dental_evaluation_enums_1.PhotoType.FRONTAL : dental_evaluation_enums_1.PhotoType.LATERAL_LEFT,
                    animal: savedAnimal
                };
                const newMedia = this.mediaRepository.create(mediaPayload);
                await queryRunner.manager.save(newMedia);
            }
            await queryRunner.commitTransaction();
            return savedAnimal;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async seed() {
        await this.createAnimalFromUpload('BR-2026-A', 'Nelore', ['https://placehold.co/600x400/000000/FFFFFF/png?text=Frontal'], {
            farm: 'Fazenda Santa Fé',
            client: 'Rodrigo Penso',
            location: 'Goiás - GO',
            collectionDate: new Date('2026-01-12'),
            age: 36
        });
        return await this.createAnimalFromUpload('BR-2026-B', 'Angus', ['https://placehold.co/600x400/550000/FFFFFF/png?text=Frontal'], {
            farm: 'Fazenda Ouro Verde',
            client: 'Fabiano Araújo',
            location: 'Nova Crixás - GO',
            collectionDate: new Date('2026-01-14'),
            age: 18
        });
    }
    async createDefaultHealthyTeeth(evaluation) {
        const teethCodes = Object.values(dental_evaluation_enums_1.ToothCode);
        const teethEntities = teethCodes.map(code => this.toothRepository.create({
            evaluation,
            toothCode: code,
            toothType: dental_evaluation_enums_1.ToothType.PERMANENT,
            fractureLevel: dental_evaluation_enums_1.SeverityScale.NONE,
            isPresent: true
        }));
        await this.toothRepository.save(teethEntities);
    }
};
exports.EvaluationService = EvaluationService;
exports.EvaluationService = EvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dental_evaluation_entity_1.DentalEvaluation)),
    __param(1, (0, typeorm_1.InjectRepository)(tooth_evaluation_entity_1.ToothEvaluation)),
    __param(2, (0, typeorm_1.InjectRepository)(animal_entity_1.Animal)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], EvaluationService);


/***/ }),

/***/ "./libs/data/src/entities/animal.entity.ts":
/*!*************************************************!*\
  !*** ./libs/data/src/entities/animal.entity.ts ***!
  \*************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Animal = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const dental_evaluation_entity_1 = __webpack_require__(/*! ./dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const media_entity_1 = __webpack_require__(/*! ./media.entity */ "./libs/data/src/entities/media.entity.ts");
let Animal = class Animal {
    id;
    tagCode;
    breed;
    age;
    farm;
    client;
    location;
    collectionDate;
    animalIdentifier;
    ageInMonths;
    generalStatus;
    registrationDate;
    dentalEvaluations;
    mediaFiles;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tagCode: { required: true, type: () => String }, breed: { required: true, type: () => String }, age: { required: true, type: () => Number }, farm: { required: true, type: () => String }, client: { required: true, type: () => String }, location: { required: true, type: () => String }, collectionDate: { required: true, type: () => Date }, animalIdentifier: { required: true, type: () => String }, ageInMonths: { required: true, type: () => Number }, generalStatus: { required: true, type: () => String }, registrationDate: { required: true, type: () => Date }, dentalEvaluations: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation)] }, mediaFiles: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/media.entity */ "./libs/data/src/entities/media.entity.ts").Media)] } };
    }
};
exports.Animal = Animal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Animal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tag_code', unique: true }),
    __metadata("design:type", String)
], Animal.prototype, "tagCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Animal.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "farm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Animal.prototype, "collectionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'animal_identifier', nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "animalIdentifier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'age_in_months', nullable: true }),
    __metadata("design:type", Number)
], Animal.prototype, "ageInMonths", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'general_status', nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "generalStatus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'registration_date' }),
    __metadata("design:type", Date)
], Animal.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dental_evaluation_entity_1.DentalEvaluation, (evaluation) => evaluation.animal),
    __metadata("design:type", Array)
], Animal.prototype, "dentalEvaluations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, (media) => media.animal),
    __metadata("design:type", Array)
], Animal.prototype, "mediaFiles", void 0);
exports.Animal = Animal = __decorate([
    (0, typeorm_1.Entity)('animal')
], Animal);


/***/ }),

/***/ "./libs/data/src/entities/dental-evaluation.entity.ts":
/*!************************************************************!*\
  !*** ./libs/data/src/entities/dental-evaluation.entity.ts ***!
  \************************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DentalEvaluation = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const animal_entity_1 = __webpack_require__(/*! ./animal.entity */ "./libs/data/src/entities/animal.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/data/src/entities/user.entity.ts");
const media_entity_1 = __webpack_require__(/*! ./media.entity */ "./libs/data/src/entities/media.entity.ts");
const tooth_evaluation_entity_1 = __webpack_require__(/*! ./tooth-evaluation.entity */ "./libs/data/src/entities/tooth-evaluation.entity.ts");
let DentalEvaluation = class DentalEvaluation {
    id;
    animal;
    animalId;
    evaluator;
    evaluatorUserId;
    mediaFiles;
    teeth;
    evaluationDate;
    generalObservations;
    generalGingivitisScore;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, animal: { required: true, type: () => (__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal) }, animalId: { required: true, type: () => Number }, evaluator: { required: true, type: () => (__webpack_require__(/*! ./libs/data/src/entities/user.entity */ "./libs/data/src/entities/user.entity.ts").User) }, evaluatorUserId: { required: true, type: () => String }, mediaFiles: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/media.entity */ "./libs/data/src/entities/media.entity.ts").Media)] }, teeth: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/tooth-evaluation.entity */ "./libs/data/src/entities/tooth-evaluation.entity.ts").ToothEvaluation)] }, evaluationDate: { required: true, type: () => Date }, generalObservations: { required: true, type: () => String }, generalGingivitisScore: { required: true, type: () => Number } };
    }
};
exports.DentalEvaluation = DentalEvaluation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], DentalEvaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => animal_entity_1.Animal, (animal) => animal.dentalEvaluations),
    (0, typeorm_1.JoinColumn)({ name: 'animal_id' }),
    __metadata("design:type", animal_entity_1.Animal)
], DentalEvaluation.prototype, "animal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'animal_id' }),
    __metadata("design:type", Number)
], DentalEvaluation.prototype, "animalId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'evaluator_user_id' }),
    __metadata("design:type", user_entity_1.User)
], DentalEvaluation.prototype, "evaluator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evaluator_user_id', type: 'uuid' }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "evaluatorUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => media_entity_1.Media, (media) => media.evaluations, {
        cascade: true
    }),
    (0, typeorm_1.JoinTable)({
        name: 'evaluation_media_link',
        joinColumn: { name: 'evaluation_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'media_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], DentalEvaluation.prototype, "mediaFiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tooth_evaluation_entity_1.ToothEvaluation, (tooth) => tooth.evaluation, {
        cascade: true
    }),
    __metadata("design:type", Array)
], DentalEvaluation.prototype, "teeth", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'evaluation_date' }),
    __metadata("design:type", Date)
], DentalEvaluation.prototype, "evaluationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'general_observations', type: 'text', nullable: true }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "generalObservations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'general_gingivitis_score', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DentalEvaluation.prototype, "generalGingivitisScore", void 0);
exports.DentalEvaluation = DentalEvaluation = __decorate([
    (0, typeorm_1.Entity)('dental_evaluation')
], DentalEvaluation);


/***/ }),

/***/ "./libs/data/src/entities/media.entity.ts":
/*!************************************************!*\
  !*** ./libs/data/src/entities/media.entity.ts ***!
  \************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Media = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const animal_entity_1 = __webpack_require__(/*! ./animal.entity */ "./libs/data/src/entities/animal.entity.ts");
const dental_evaluation_entity_1 = __webpack_require__(/*! ./dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const dental_evaluation_enums_1 = __webpack_require__(/*! ../enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
let Media = class Media {
    id;
    s3UrlPath;
    photoType;
    uploadDate;
    animal;
    animalId;
    evaluations;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, s3UrlPath: { required: true, type: () => String }, photoType: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").PhotoType) }, uploadDate: { required: true, type: () => Date }, animal: { required: true, type: () => (__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal) }, animalId: { required: true, type: () => Number }, evaluations: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation)] } };
    }
};
exports.Media = Media;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Media.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 's3_url_path', type: 'text' }),
    __metadata("design:type", String)
], Media.prototype, "s3UrlPath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'photo_type',
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.PhotoType,
        default: dental_evaluation_enums_1.PhotoType.FRONTAL
    }),
    __metadata("design:type", String)
], Media.prototype, "photoType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'upload_date' }),
    __metadata("design:type", Date)
], Media.prototype, "uploadDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => animal_entity_1.Animal, (animal) => animal.mediaFiles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'animal_id' }),
    __metadata("design:type", animal_entity_1.Animal)
], Media.prototype, "animal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'animal_id' }),
    __metadata("design:type", Number)
], Media.prototype, "animalId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => dental_evaluation_entity_1.DentalEvaluation, (evaluation) => evaluation.mediaFiles),
    __metadata("design:type", Array)
], Media.prototype, "evaluations", void 0);
exports.Media = Media = __decorate([
    (0, typeorm_1.Entity)('media')
], Media);


/***/ }),

/***/ "./libs/data/src/entities/tooth-evaluation.entity.ts":
/*!***********************************************************!*\
  !*** ./libs/data/src/entities/tooth-evaluation.entity.ts ***!
  \***********************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToothEvaluation = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const dental_evaluation_entity_1 = __webpack_require__(/*! ./dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const dental_evaluation_enums_1 = __webpack_require__(/*! ../enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
let ToothEvaluation = class ToothEvaluation {
    id;
    toothCode;
    toothType;
    isPresent;
    crownReductionLevel;
    lingualWear;
    gingivalRecessionLevel;
    periodontalLesions;
    fractureLevel;
    pulpitis;
    vitrifiedBorder;
    pulpChamberExposure;
    gingivitisEdema;
    gingivitisColor;
    dentalCalculus;
    abnormalColor;
    caries;
    evaluation;
    evaluationId;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, toothCode: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").ToothCode) }, toothType: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").ToothType) }, isPresent: { required: true, type: () => Boolean }, crownReductionLevel: { required: true, type: () => Number }, lingualWear: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, gingivalRecessionLevel: { required: true, type: () => Number }, periodontalLesions: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, fractureLevel: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, pulpitis: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, vitrifiedBorder: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, pulpChamberExposure: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, gingivitisEdema: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, gingivitisColor: { required: true, type: () => Number }, dentalCalculus: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, abnormalColor: { required: true, type: () => Number }, caries: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityScale) }, evaluation: { required: true, type: () => (__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation) }, evaluationId: { required: true, type: () => Number } };
    }
};
exports.ToothEvaluation = ToothEvaluation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.ToothCode,
        name: 'tooth_code'
    }),
    __metadata("design:type", String)
], ToothEvaluation.prototype, "toothCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.ToothType,
        default: dental_evaluation_enums_1.ToothType.PERMANENT,
        name: 'tooth_type'
    }),
    __metadata("design:type", String)
], ToothEvaluation.prototype, "toothType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_present', default: true }),
    __metadata("design:type", Boolean)
], ToothEvaluation.prototype, "isPresent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'crown_reduction_level', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "crownReductionLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lingual_wear', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "lingualWear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gingival_recession_level', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "gingivalRecessionLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'periodontal_lesions', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "periodontalLesions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fracture_level', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "fractureLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pulpitis', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "pulpitis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vitrified_border', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "vitrifiedBorder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pulp_chamber_exposure', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "pulpChamberExposure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gingivitis_edema', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "gingivitisEdema", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gingivitis_color', type: 'int', default: dental_evaluation_enums_1.ColorScale.NORMAL }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "gingivitisColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dental_calculus', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "dentalCalculus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'abnormal_color', type: 'int', default: dental_evaluation_enums_1.ColorScale.NORMAL }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "abnormalColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'caries', type: 'int', default: dental_evaluation_enums_1.SeverityScale.NONE }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "caries", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dental_evaluation_entity_1.DentalEvaluation, (evaluation) => evaluation.teeth, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'dental_evaluation_id' }),
    __metadata("design:type", dental_evaluation_entity_1.DentalEvaluation)
], ToothEvaluation.prototype, "evaluation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dental_evaluation_id' }),
    __metadata("design:type", Number)
], ToothEvaluation.prototype, "evaluationId", void 0);
exports.ToothEvaluation = ToothEvaluation = __decorate([
    (0, typeorm_1.Entity)('tooth_evaluation')
], ToothEvaluation);


/***/ }),

/***/ "./libs/data/src/entities/user.entity.ts":
/*!***********************************************!*\
  !*** ./libs/data/src/entities/user.entity.ts ***!
  \***********************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
    id;
    fullName;
    email;
    password;
    role;
    registrationDate;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, type: () => String }, registrationDate: { required: true, type: () => Date } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'registration_date' }),
    __metadata("design:type", Date)
], User.prototype, "registrationDate", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);


/***/ }),

/***/ "./libs/data/src/enums/dental-evaluation.enums.ts":
/*!********************************************************!*\
  !*** ./libs/data/src/enums/dental-evaluation.enums.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhotoType = exports.ToothCode = exports.BinaryStatus = exports.ToothType = exports.ColorScale = exports.SeverityScale = void 0;
var SeverityScale;
(function (SeverityScale) {
    SeverityScale[SeverityScale["NONE"] = 0] = "NONE";
    SeverityScale[SeverityScale["MODERATE"] = 1] = "MODERATE";
    SeverityScale[SeverityScale["SEVERE"] = 2] = "SEVERE";
})(SeverityScale || (exports.SeverityScale = SeverityScale = {}));
var ColorScale;
(function (ColorScale) {
    ColorScale[ColorScale["NORMAL"] = 0] = "NORMAL";
    ColorScale[ColorScale["ALTERED"] = 1] = "ALTERED";
})(ColorScale || (exports.ColorScale = ColorScale = {}));
var ToothType;
(function (ToothType) {
    ToothType["DECIDUOUS"] = "DECIDUOUS";
    ToothType["PERMANENT"] = "PERMANENT";
})(ToothType || (exports.ToothType = ToothType = {}));
var BinaryStatus;
(function (BinaryStatus) {
    BinaryStatus[BinaryStatus["ABSENT"] = 0] = "ABSENT";
    BinaryStatus[BinaryStatus["PRESENT"] = 1] = "PRESENT";
})(BinaryStatus || (exports.BinaryStatus = BinaryStatus = {}));
var ToothCode;
(function (ToothCode) {
    ToothCode["I1_LEFT"] = "I1_L";
    ToothCode["I1_RIGHT"] = "I1_R";
    ToothCode["I2_LEFT"] = "I2_L";
    ToothCode["I2_RIGHT"] = "I2_R";
    ToothCode["I3_LEFT"] = "I3_L";
    ToothCode["I3_RIGHT"] = "I3_R";
    ToothCode["I4_LEFT"] = "I4_L";
    ToothCode["I4_RIGHT"] = "I4_R";
})(ToothCode || (exports.ToothCode = ToothCode = {}));
var PhotoType;
(function (PhotoType) {
    PhotoType["FRONTAL"] = "FRONTAL";
    PhotoType["LINGUAL"] = "LINGUAL";
    PhotoType["LATERAL_LEFT"] = "LATERAL_LEFT";
    PhotoType["LATERAL_RIGHT"] = "LATERAL_RIGHT";
    PhotoType["SUPERIOR"] = "SUPERIOR";
})(PhotoType || (exports.PhotoType = PhotoType = {}));


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
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
/*!********************************!*\
  !*** ./apps/admin/src/main.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/admin/src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('AnimalTools Admin API')
        .setDescription('API para gestão de avaliações de saúde bucal bovina')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3333);
    console.log('API Admin rodando em http://localhost:3333');
    console.log('Swagger disponível em http://localhost:3333/api');
}
bootstrap();

})();

/******/ })()
;