"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerOnly = exports.checkTenantOwner = exports.checkTenantCombination = exports.checkTenantAdmin = exports.checkTenantSuperAdmin = exports.authorizeRole = void 0;
const authorizeRole = (role) => {
    return (req, res, next) => {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if ((user === null || user === void 0 ? void 0 : user.role) !== role) {
            return res.status(403).json({
                message: 'Access denied. You do not have the right permissions.',
            });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
const checkTenantSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { tenantCode } = req.params;
    // const user = req.user; // Ambil dari token login
    // const adminTenant = await db.userBusiness.findFirst({
    //   where: {
    //     userId: user?.userId,
    //     businessTypeCode: tenantCode,
    //     isTenantAdmin: true,
    //   },
    //   include: {
    //     role: true,
    //   },
    // });
    // if (!adminTenant) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Unauthorized: You are not an admin of this tenant' });
    // }
    // if (!['SUPERADMIN'].includes(adminTenant?.roleCode as string)) {
    //   return res.status(403).json({
    //     message:
    //       'Unauthorized: You are not an admin or superadmin  of this tenant',
    //   });
    // }
    next();
});
exports.checkTenantSuperAdmin = checkTenantSuperAdmin;
const checkTenantAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { tenantCode } = req.params;
    // const user = req.user; // Ambil dari token login
    // const adminTenant = await db.userBusiness.findFirst({
    //   where: {
    //     userId: user?.userId,
    //     businessTypeCode: tenantCode,
    //     isTenantAdmin: true,
    //   },
    //   include: {
    //     role: true,
    //   },
    // });
    // if (!adminTenant) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Unauthorized: You are not an admin of this tenant' });
    // }
    // if (!['ADMIN', 'SUPERADMIN'].includes(adminTenant?.roleCode as string)) {
    //   return res.status(403).json({
    //     message:
    //       'Unauthorized: You are not an admin or superadmin  of this tenant',
    //   });
    // }
    next();
});
exports.checkTenantAdmin = checkTenantAdmin;
const checkTenantCombination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { tenantCode } = req.params;
    // const user = req.user; // Ambil dari token login
    // const adminTenant = await db.userBusiness.findFirst({
    //   where: {
    //     userId: user?.userId,
    //     businessTypeCode: tenantCode,
    //   },
    //   include: {
    //     role: true,
    //   },
    // });
    // if (!adminTenant) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Unauthorized: You are not an admin of this tenant' });
    // }
    // if (
    //   !['ADMIN', 'SUPERADMIN', 'OWNER'].includes(adminTenant?.roleCode as string)
    // ) {
    //   return res.status(403).json({
    //     message:
    //       'Unauthorized: You are not an admin or superadmin  of this tenant',
    //   });
    // }
    next();
});
exports.checkTenantCombination = checkTenantCombination;
const checkTenantOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { tenantCode } = req.params;
    // const user = req.user; // Ambil dari token login
    // const adminTenant = await db.userBusiness.findFirst({
    //   where: {
    //     userId: user?.userId,
    //     businessTypeCode: tenantCode,
    //   },
    //   include: {
    //     role: true,
    //   },
    // });
    // if (!adminTenant) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Unauthorized: You are not an admin of this tenant' });
    // }
    // if (!['OWNER', 'SUPERADMIN'].includes(adminTenant?.roleCode as string)) {
    //   return res.status(403).json({
    //     message:
    //       'Unauthorized: You are not an owner or superadmin of this tenant',
    //   });
    // }
    next();
});
exports.checkTenantOwner = checkTenantOwner;
const ownerOnly = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { businessCode } = req.params;
    // const user = req.user; // Ambil dari token login
    // const owner = await db.userBusiness.findFirst({
    //   where: {
    //     userId: user?.userId,
    //     businessTypeCode: businessCode,
    //   },
    //   include: {
    //     role: true,
    //   },
    // });
    // if (!owner) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Unauthorized: You are not an admin of this tenant' });
    // }
    // if (!['OWNER'].includes(owner?.roleCode as string)) {
    //   return res.status(403).json({
    //     message: 'Unauthorized: You are not an owner of this bisnis',
    //   });
    // }
    next();
});
exports.ownerOnly = ownerOnly;
