/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        ],
    })
], AppModule);


/***/ }),

/***/ "./apps/admin/src/evaluation/dto/create-evaluation.dto.ts":
/*!****************************************************************!*\
  !*** ./apps/admin/src/evaluation/dto/create-evaluation.dto.ts ***!
  \****************************************************************/
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
exports.CreateEvaluationDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const dental_evaluation_enums_1 = __webpack_require__(/*! @lib/data/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
class CreateEvaluationDto {
    animalId;
    evaluatorId;
    isToothAbsent;
    fractureLevel;
    crownReduction;
    lingualWear;
    pulpitis;
    pulpChamberExposure;
    gingivalRecession;
    periodontalLesions;
    gingivitis;
    observations;
    static _OPENAPI_METADATA_FACTORY() {
        return { animalId: { required: true, type: () => String, format: "uuid" }, evaluatorId: { required: true, type: () => String, format: "uuid" }, isToothAbsent: { required: true, type: () => Boolean }, fractureLevel: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").FractureLevel) }, crownReduction: { required: true, type: () => Boolean }, lingualWear: { required: true, type: () => Boolean }, pulpitis: { required: true, type: () => Boolean }, pulpChamberExposure: { required: true, type: () => Boolean }, gingivalRecession: { required: true, type: () => Number }, periodontalLesions: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityLevel) }, gingivitis: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityLevel) }, observations: { required: false, type: () => String } };
    }
}
exports.CreateEvaluationDto = CreateEvaluationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEvaluationDto.prototype, "animalId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEvaluationDto.prototype, "evaluatorId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEvaluationDto.prototype, "isToothAbsent", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(dental_evaluation_enums_1.FractureLevel),
    __metadata("design:type", String)
], CreateEvaluationDto.prototype, "fractureLevel", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEvaluationDto.prototype, "crownReduction", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEvaluationDto.prototype, "lingualWear", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEvaluationDto.prototype, "pulpitis", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEvaluationDto.prototype, "pulpChamberExposure", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEvaluationDto.prototype, "gingivalRecession", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(dental_evaluation_enums_1.SeverityLevel),
    __metadata("design:type", String)
], CreateEvaluationDto.prototype, "periodontalLesions", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(dental_evaluation_enums_1.SeverityLevel),
    __metadata("design:type", String)
], CreateEvaluationDto.prototype, "gingivitis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEvaluationDto.prototype, "observations", void 0);


/***/ }),

/***/ "./apps/admin/src/evaluation/dto/update-evaluation.dto.ts":
/*!****************************************************************!*\
  !*** ./apps/admin/src/evaluation/dto/update-evaluation.dto.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateEvaluationDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_evaluation_dto_1 = __webpack_require__(/*! ./create-evaluation.dto */ "./apps/admin/src/evaluation/dto/create-evaluation.dto.ts");
class UpdateEvaluationDto extends (0, mapped_types_1.PartialType)(create_evaluation_dto_1.CreateEvaluationDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEvaluationDto = UpdateEvaluationDto;


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
const update_evaluation_dto_1 = __webpack_require__(/*! ./dto/update-evaluation.dto */ "./apps/admin/src/evaluation/dto/update-evaluation.dto.ts");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const evaluation_service_1 = __webpack_require__(/*! ./evaluation.service */ "./apps/admin/src/evaluation/evaluation.service.ts");
const create_evaluation_dto_1 = __webpack_require__(/*! ./dto/create-evaluation.dto */ "./apps/admin/src/evaluation/dto/create-evaluation.dto.ts");
let EvaluationController = class EvaluationController {
    evaluationService;
    constructor(evaluationService) {
        this.evaluationService = evaluationService;
    }
    async create(createEvaluationDto) {
        return await this.evaluationService.create(createEvaluationDto);
    }
    async uploadAnimal(files, body) {
        const baseUrl = 'http://localhost:3000';
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
    __metadata("design:paramtypes", [create_evaluation_dto_1.CreateEvaluationDto]),
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
    __metadata("design:paramtypes", [String, update_evaluation_dto_1.UpdateEvaluationDto]),
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
const dental_evaluation_entity_1 = __webpack_require__(/*! @lib/data/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const animal_entity_1 = __webpack_require__(/*! @lib/data/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts");
const user_entity_1 = __webpack_require__(/*! @lib/data/entities/user.entity */ "./libs/data/src/entities/user.entity.ts");
const media_entity_1 = __webpack_require__(/*! @lib/data/entities/media.entity */ "./libs/data/src/entities/media.entity.ts");
let EvaluationModule = class EvaluationModule {
};
exports.EvaluationModule = EvaluationModule;
exports.EvaluationModule = EvaluationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dental_evaluation_entity_1.DentalEvaluation, animal_entity_1.Animal, user_entity_1.User, media_entity_1.Media]),
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
const dental_evaluation_entity_1 = __webpack_require__(/*! @lib/data/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts");
const animal_entity_1 = __webpack_require__(/*! @lib/data/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts");
const user_entity_1 = __webpack_require__(/*! @lib/data/entities/user.entity */ "./libs/data/src/entities/user.entity.ts");
const media_entity_1 = __webpack_require__(/*! @lib/data/entities/media.entity */ "./libs/data/src/entities/media.entity.ts");
const dental_evaluation_enums_1 = __webpack_require__(/*! @lib/data/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
const dental_evaluation_enums_2 = __webpack_require__(/*! @lib/data/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
const typeorm_3 = __webpack_require__(/*! typeorm */ "typeorm");
let EvaluationService = class EvaluationService {
    evaluationRepository;
    animalRepository;
    userRepository;
    mediaRepository;
    dataSource;
    constructor(evaluationRepository, animalRepository, userRepository, mediaRepository, dataSource) {
        this.evaluationRepository = evaluationRepository;
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
        if (!animal) {
            throw new common_1.NotFoundException(`Animal não encontrado.`);
        }
        const evaluator = await this.userRepository.findOne({
            where: { id: createDto.evaluatorId }
        });
        if (!evaluator) {
            throw new common_1.NotFoundException(`Avaliador não encontrado. Rode o /seed primeiro.`);
        }
        const { animalId, evaluatorId, ...clinicalData } = createDto;
        const evaluation = this.evaluationRepository.create({
            ...clinicalData,
            animal: animal,
            evaluator: evaluator
        });
        return await this.evaluationRepository.save(evaluation);
    }
    async findPendingEvaluations() {
        const animals = await this.animalRepository.find({
            relations: ['dentalEvaluations', 'mediaFiles'],
        });
        return animals
            .filter(a => a.dentalEvaluations.length === 0 && a.mediaFiles.length > 0)
            .map(a => ({
            id: a.id.toString(),
            code: a.tagCode,
            breed: a.breed,
            media: a.mediaFiles.map(m => m.s3UrlPath)
        }));
    }
    async findAllHistory(page = 1, limit = 10) {
        const [result, total] = await this.animalRepository.createQueryBuilder('animal')
            .innerJoinAndSelect('animal.dentalEvaluations', 'evaluation')
            .leftJoinAndSelect('animal.mediaFiles', 'media')
            .orderBy('animal.id', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: result.map(a => ({
                id: a.id.toString(),
                code: a.tagCode,
                breed: a.breed,
                lastEvaluationDate: a.dentalEvaluations[0]?.evaluationDate,
                media: a.mediaFiles.map(m => m.s3UrlPath)
            })),
            meta: {
                total,
                page,
                limit
            }
        };
    }
    async createAnimalFromUpload(code, breed, mediaPaths) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newAnimal = this.animalRepository.create({
                tagCode: code,
                breed: breed,
                generalStatus: 'PENDING'
            });
            const savedAnimal = await queryRunner.manager.save(newAnimal);
            for (const [index, path] of mediaPaths.entries()) {
                const newMedia = this.mediaRepository.create({
                    s3UrlPath: path,
                    photoType: index === 0 ? dental_evaluation_enums_1.PhotoType.FRONTAL : dental_evaluation_enums_1.PhotoType.VESTIBULAR,
                    animal: savedAnimal
                });
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
        const evaluatorId = "d290f1ee-6c54-4b01-90e6-d701748f0851";
        let user = await this.userRepository.findOne({ where: { id: evaluatorId } });
        if (!user) {
            user = this.userRepository.create({
                id: evaluatorId,
                fullName: "Avaliador Padrão",
                email: "avaliador@animaltools.com"
            });
            await this.userRepository.save(user);
        }
        const examplePhotos = [
            "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=600",
            "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600"
        ];
        return await this.createAnimalFromUpload('BOI-SEED-' + Math.floor(Math.random() * 1000), 'Nelore', examplePhotos);
    }
    async findOne(id) {
        const evaluation = await this.evaluationRepository.findOne({
            where: { id },
            relations: ['animal', 'evaluator', 'mediaFiles'],
        });
        if (!evaluation) {
            throw new common_1.NotFoundException(`Avaliação #${id} não encontrada.`);
        }
        return evaluation;
    }
    async findHistoryByAnimal(animalIdOrTag) {
        const isId = !isNaN(Number(animalIdOrTag));
        const query = this.evaluationRepository.createQueryBuilder('evaluation')
            .leftJoinAndSelect('evaluation.animal', 'animal')
            .leftJoinAndSelect('evaluation.mediaFiles', 'media')
            .leftJoinAndSelect('evaluation.evaluator', 'evaluator');
        if (isId) {
            query.where('animal.id = :id', { id: animalIdOrTag });
        }
        else {
            query.where('animal.tagCode = :tag', { tag: animalIdOrTag });
        }
        return await query.orderBy('evaluation.evaluationDate', 'DESC').getMany();
    }
    async update(id, updateDto) {
        const { animalId, evaluatorId, ...dataToUpdate } = updateDto;
        const evaluation = await this.findOne(id);
        Object.assign(evaluation, dataToUpdate);
        return await this.evaluationRepository.save(evaluation);
    }
    async remove(id) {
        const evaluation = await this.findOne(id);
        return await this.evaluationRepository.remove(evaluation);
    }
    async getDashboardStats() {
        const totalAnimals = await this.animalRepository.count();
        const totalEvaluations = await this.evaluationRepository.count();
        const pending = (await this.findPendingEvaluations()).length;
        const criticalCases = await this.evaluationRepository.count({
            where: { generalHealthStatus: dental_evaluation_enums_2.GeneralHealthStatus.CRITICAL }
        });
        return {
            totalAnimals,
            totalEvaluations,
            pendingEvaluations: pending,
            criticalCases,
        };
    }
};
exports.EvaluationService = EvaluationService;
exports.EvaluationService = EvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dental_evaluation_entity_1.DentalEvaluation)),
    __param(1, (0, typeorm_1.InjectRepository)(animal_entity_1.Animal)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_3.DataSource])
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
    animalIdentifier;
    breed;
    ageInMonths;
    generalStatus;
    registrationDate;
    dentalEvaluations;
    mediaFiles;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tagCode: { required: true, type: () => String }, animalIdentifier: { required: true, type: () => String }, breed: { required: true, type: () => String }, ageInMonths: { required: true, type: () => Number }, generalStatus: { required: true, type: () => String }, registrationDate: { required: true, type: () => Date }, dentalEvaluations: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/dental-evaluation.entity */ "./libs/data/src/entities/dental-evaluation.entity.ts").DentalEvaluation)] }, mediaFiles: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/media.entity */ "./libs/data/src/entities/media.entity.ts").Media)] } };
    }
};
exports.Animal = Animal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Animal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tag_code' }),
    __metadata("design:type", String)
], Animal.prototype, "tagCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'animal_identifier', nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "animalIdentifier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "breed", void 0);
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
const dental_evaluation_enums_1 = __webpack_require__(/*! ../enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts");
let DentalEvaluation = class DentalEvaluation {
    id;
    animal;
    animalId;
    evaluator;
    evaluatorUserId;
    mediaFiles;
    latitude;
    longitude;
    evaluationDate;
    generalHealthStatus;
    isToothAbsent;
    fractureLevel;
    crownReduction;
    lingualWear;
    pulpitis;
    pulpChamberExposure;
    gingivalRecession;
    periodontalLesions;
    gingivitis;
    generalObservations;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, animal: { required: true, type: () => (__webpack_require__(/*! ./libs/data/src/entities/animal.entity */ "./libs/data/src/entities/animal.entity.ts").Animal) }, animalId: { required: true, type: () => Number }, evaluator: { required: true, type: () => (__webpack_require__(/*! ./libs/data/src/entities/user.entity */ "./libs/data/src/entities/user.entity.ts").User) }, evaluatorUserId: { required: true, type: () => String }, mediaFiles: { required: true, type: () => [(__webpack_require__(/*! ./libs/data/src/entities/media.entity */ "./libs/data/src/entities/media.entity.ts").Media)] }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, evaluationDate: { required: true, type: () => Date }, generalHealthStatus: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").GeneralHealthStatus) }, isToothAbsent: { required: true, type: () => Boolean }, fractureLevel: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").FractureLevel) }, crownReduction: { required: true, type: () => Boolean }, lingualWear: { required: true, type: () => Boolean }, pulpitis: { required: true, type: () => Boolean }, pulpChamberExposure: { required: true, type: () => Boolean }, gingivalRecession: { required: true, type: () => Number }, periodontalLesions: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityLevel) }, gingivitis: { required: true, enum: (__webpack_require__(/*! ./libs/data/src/enums/dental-evaluation.enums */ "./libs/data/src/enums/dental-evaluation.enums.ts").SeverityLevel) }, generalObservations: { required: true, type: () => String } };
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
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], DentalEvaluation.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], DentalEvaluation.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'evaluation_date' }),
    __metadata("design:type", Date)
], DentalEvaluation.prototype, "evaluationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'general_health_status',
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.GeneralHealthStatus,
        nullable: true
    }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "generalHealthStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_tooth_absent', default: false }),
    __metadata("design:type", Boolean)
], DentalEvaluation.prototype, "isToothAbsent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fracture_level',
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.FractureLevel,
        default: dental_evaluation_enums_1.FractureLevel.NONE,
    }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "fractureLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'crown_reduction', default: false }),
    __metadata("design:type", Boolean)
], DentalEvaluation.prototype, "crownReduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lingual_wear', default: false }),
    __metadata("design:type", Boolean)
], DentalEvaluation.prototype, "lingualWear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pulpitis', default: false }),
    __metadata("design:type", Boolean)
], DentalEvaluation.prototype, "pulpitis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pulp_chamber_exposure', default: false }),
    __metadata("design:type", Boolean)
], DentalEvaluation.prototype, "pulpChamberExposure", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'gingival_recession',
        type: 'float',
        default: 0
    }),
    __metadata("design:type", Number)
], DentalEvaluation.prototype, "gingivalRecession", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'periodontal_lesions',
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.SeverityLevel,
        default: dental_evaluation_enums_1.SeverityLevel.ABSENT
    }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "periodontalLesions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'gingivitis',
        type: 'simple-enum',
        enum: dental_evaluation_enums_1.SeverityLevel,
        default: dental_evaluation_enums_1.SeverityLevel.ABSENT,
    }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "gingivitis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'general_observations', type: 'text', nullable: true }),
    __metadata("design:type", String)
], DentalEvaluation.prototype, "generalObservations", void 0);
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
    (0, typeorm_1.ManyToOne)(() => animal_entity_1.Animal, (animal) => animal.mediaFiles),
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
    registrationDate;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String }, registrationDate: { required: true, type: () => Date } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
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
exports.PhotoType = exports.GeneralHealthStatus = exports.SeverityLevel = exports.FractureLevel = void 0;
var FractureLevel;
(function (FractureLevel) {
    FractureLevel["NONE"] = "NONE";
    FractureLevel["ENAMEL"] = "ENAMEL";
    FractureLevel["DENTINE"] = "DENTINE";
    FractureLevel["PULP"] = "PULP";
})(FractureLevel || (exports.FractureLevel = FractureLevel = {}));
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["ABSENT"] = "ABSENT";
    SeverityLevel["MILD"] = "MILD";
    SeverityLevel["MODERATE"] = "MODERATE";
    SeverityLevel["SEVERE"] = "SEVERE";
})(SeverityLevel || (exports.SeverityLevel = SeverityLevel = {}));
var GeneralHealthStatus;
(function (GeneralHealthStatus) {
    GeneralHealthStatus["EXCELLENT"] = "EXCELLENT";
    GeneralHealthStatus["GOOD"] = "GOOD";
    GeneralHealthStatus["REGULAR"] = "REGULAR";
    GeneralHealthStatus["POOR"] = "POOR";
    GeneralHealthStatus["CRITICAL"] = "CRITICAL";
})(GeneralHealthStatus || (exports.GeneralHealthStatus = GeneralHealthStatus = {}));
var PhotoType;
(function (PhotoType) {
    PhotoType["FRONTAL"] = "FRONTAL";
    PhotoType["VESTIBULAR"] = "VESTIBULAR";
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

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

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
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('AnimalTools Admin API')
        .setDescription('API para gestão de avaliações de saúde bucal bovina')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
    console.log('API Admin rodando em http://localhost:3000');
    console.log('Swagger disponível em http://localhost:3000/api');
}
bootstrap();

})();

/******/ })()
;