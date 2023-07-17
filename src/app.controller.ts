import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe
} from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { ReportType } from 'src/data';
import { AppService } from "./app.service";

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) { }

  @Get('')
  getAllIncomeReports(@Param('type') type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllIncomeReports(reportType)
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id', ParseUUIDPipe) id: string) {
    console.log(id, typeof id);

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number, source: string },
    @Param('type') type: string
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateIncomeReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number, source: string }
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(
    @Param('id') id: string
  ) {
    return this.appService.deleteReport(id)
  }

}
