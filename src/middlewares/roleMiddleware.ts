// import { db } from '@libs/database';
import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (user?.role !== role) {
      return res.status(403).json({
        message: 'Access denied. You do not have the right permissions.',
      });
    }
    next();
  };
};

export const checkTenantSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};

export const checkTenantAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};

export const checkTenantCombination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};
export const checkTenantOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};

export const ownerOnly = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};
