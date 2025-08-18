import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { DivisionService } from "./division.service";

const createDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.createDivision(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division created",
        data: result,
    });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDivisions();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta,
    });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
   
    const result = await DivisionService.updateDivision(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated",
        data: result,
    });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision,
};
