/**
 * önceki aksiyonun outputları ile
 * sonraki aksiyonun inputları arasında bağlantı
 */

import { IBase } from "./iBase";

export interface IActionField {
  name: string;
}

export interface IMongoActionField extends IActionField, IBase {

}