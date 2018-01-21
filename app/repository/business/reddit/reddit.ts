/**
 * burası business logic için
 * get hot post in reddit dendiğinde
 * reddit entegrasyonunu kullanarak datayı çekip, bu dosyadaki business
 * kurallarını kullanarak cevap vermeli
 */

import * as Q from "q";
import { IServiceActionInstance } from "../../../database/models";
import { getHotListOf } from "../../integrations/reddit";

export class RedditRepository {
  public static async checkHotPost(actionInstance: IServiceActionInstance) {
    const d = Q.defer();
    /**
     * payload'da hiç id yoksa
     *   sayfayı parsela,
     *   20 postun idsini sakla
     *   false dön
     * bir dahaki triggerda
     *   sayfayı parsela
     *   payload'dan farklı yeni id gelmişse ilk bulduğunu dön
     *   profit!
     */

    if (actionInstance.payload && actionInstance.payload.length > 0) {

    }
    else {
      
    }

    return d.promise;
  }
}