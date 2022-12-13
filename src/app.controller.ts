import { Controller, Get, Post, Body, Res, HttpStatus, Headers, Param } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signin')
  async signIn(@Body() body, @Res() res: Response) {
    try {
      const hash = await this.appService.signIn(body);
      return res.status(HttpStatus.OK).send(hash);
    } catch (error) {
      throw error;
    }
  }

  @Post('/checkSession')
  async checkSession(@Body() body, @Res() res: Response) {
    const { address, hash } = body;
    try {
      const isValid = await this.appService.checkSession(address, hash);
      return res.status(HttpStatus.OK).send(isValid);
    } catch (error) {
      throw error;
    }
  }

  @Get('/secret/:address')
  async getSecretCode(@Param('address') address: string, @Res() res: Response, @Headers() headers) {
    const hash = headers?.authorization ?? 'no header';
    try {
      const isValid = await this.appService.getSecretCode(address, hash);
      return res.status(HttpStatus.OK).send(isValid);
    } catch (error) {
      throw error;
    }
  }
}
