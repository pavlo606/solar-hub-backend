import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Prisma } from "@/generated/prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const { code, meta } = exception;

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";

        switch (code) {
            case "P2002":
                status = HttpStatus.CONFLICT;
                message = `Duplicate value for unique field: ${meta?.target}`;
                break;

            case "P2003":
                status = HttpStatus.BAD_REQUEST;
                message = `Foreign key constraint failed on field: ${meta?.field_name}`;
                break;

            case "P2025":
                status = HttpStatus.NOT_FOUND;
                message = "Record not found";
                break;

            case "P2000":
                status = HttpStatus.BAD_REQUEST;
                message = `Value too long for field: ${meta?.target}`;
                break;

            case "P2004":
                status = HttpStatus.BAD_REQUEST;
                message = `Constraint failed: ${exception.message}`;
                break;

            case "P2005":
                status = HttpStatus.BAD_REQUEST;
                message = `Invalid value for field type: ${meta?.field_name}`;
                break;

            case "P2009":
                status = HttpStatus.BAD_REQUEST;
                message = `Invalid query: ${exception.message}`;
                break;

            case "P2018":
                status = HttpStatus.BAD_REQUEST;
                message = `Required relation not found: ${meta?.relation_name}`;
                break;

            case "P2021":
                status = HttpStatus.BAD_REQUEST;
                message = `Invalid table or column name: ${meta?.table}`;
                break;

            case "P2033":
                status = HttpStatus.BAD_REQUEST;
                message = `Constraint violation: ${exception.message}`;
                break;

            default:
                message = `[${code}] ${exception.message}`;
                break;
        }

        response.status(status).json({
            statusCode: status,
            errorCode: code,
            message,
        });
    }
}
