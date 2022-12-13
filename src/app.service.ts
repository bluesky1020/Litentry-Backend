import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import * as bcrypt from 'bcrypt';
import { Secret } from './schemas/secret.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Secret.name) private readonly secretModel: Model<Secret>) {}

  isValidSignature(signedMessage, signature, address) {
    console.log(signedMessage, signature, address);
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
  
    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
  };

  async signIn(payload) {
    const { address, message, signature } = payload;
    await cryptoWaitReady();
    if (!this.isValidSignature(message, signature, address)) {
      throw new BadRequestException('Signature is not valid');
    }
    const salt = process.env.BCRYPT_SALT ?? 'default-salt';
    console.log(salt);
    const hash = await bcrypt.hash(address, Number(salt));
    return hash;
  }

  async checkSession(address, hash) {
    const isValid = await bcrypt.compare(address, hash);
    return isValid;
  }

  async getSecretCode(address, hash) {
    const isValid = await this.checkSession(address, hash);
    console.log(isValid, address, hash);
    if (!isValid) {
      throw new BadRequestException('Authorization is not valid');
    }
    const secrets = await this.secretModel.find({}).exec();
    const randIndex = Math.floor(Math.random() * secrets.length);
    return secrets[randIndex].secretCode;
  }
}
