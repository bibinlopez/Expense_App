


import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    ParseUUIDPipe,
    ParseEnumPipe
} from "@nestjs/common"
import { ReportType } from 'src/data';
import { ReportService } from "./report.service";
import { CreateReportDto, UpdateReportDto, ReportResponseDto } from "src/dto/report.dto"

@Controller('report/:type')
export class ReportController {

    constructor(
        private readonly reportService: ReportService
    ) { }

    @Get('')
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getAllReports(reportType)
    }

    @Get(':id')
    getReportById(
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
        @Param('id', ParseUUIDPipe) id: string
    ): ReportResponseDto {
        const reportType =
            type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getReportById(reportType, id);
    }

    @Post()
    createReport(
        @Body() { amount, source }: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string
    ): ReportResponseDto {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.createReport(reportType, { amount, source })
    }

    @Put(':id')
    updateIncomeReport(
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
        @Param('id') id: string,
        @Body() body: UpdateReportDto
    ): ReportResponseDto {
        const reportType =
            type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.updateReport(reportType, id, body)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteIncomeReport(
        @Param('id') id: string
    ) {
        return this.reportService.deleteReport(id)
    }

}
