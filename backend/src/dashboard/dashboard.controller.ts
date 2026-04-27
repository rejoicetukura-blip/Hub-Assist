import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth('bearer')
@Controller('dashboard')
export class DashboardController {
  constructor(private service: DashboardService) {}

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved successfully' })
  getStats() {
    return this.service.getStats();
  }

  @Get('activity')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get recent activity' })
  @ApiResponse({ status: 200, description: 'Activity retrieved successfully' })
  getActivity() {
    return this.service.getActivity();
  }

  @Get('admin-stats')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get admin statistics (admin only)' })
  @ApiResponse({ status: 200, description: 'Admin stats retrieved successfully' })
  getAdminStats(@Request() req) {
    if (req.user.role !== 'admin') {
      return { error: 'Unauthorized' };
    }
    return this.service.getAdminStats();
  }
}
