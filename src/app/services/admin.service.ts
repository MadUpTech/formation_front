import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Correction, CorrectionList, CorrectionRequest, Examen, ExamenByList, ExamenList, FileByModule, FileByModulee, Module, User } from '../admin/modele-admin/module.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatePassword } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  codeMaxModule!: number

  constructor(private http: HttpClient) { }


  public getToken(): Observable<any> {
    return this.http.get<string>(environment.backEndHost + "/api/token");
  }

  public supprimerClient(idClient: string): Observable<string> {
    return this.http.get<string>(environment.backEndHost + "/api/delete_user/" + idClient)
  }
  public isPayement(idClient: string): Observable<User> {
    return this.http.get<User>(environment.backEndHost + "/api/is_payement_user/" + idClient)
  }

  public getClient(idClient: string): Observable<User> {
    return this.http.get<User>(environment.backEndHost + "/api/get_utilisateur/" + idClient);
  }
  public modifierPassWord(data: UpdatePassword): Observable<User> {
    return this.http.post<User>(environment.backEndHost + "/api/update_password", data);
  }


  public getListClient(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.backEndHost + "/api/get_utilisateurs");
  }

  public modifierStatus(idClient: string): Observable<User> {
    return this.http.get<User>(environment.backEndHost + "/api/modifier_status_user/" + idClient);
  }

  public createModule(module: Module): Observable<Module> {
    return this.http.post<Module>(environment.backEndHost + "/api/create_module", module);
  }

  public listModule(): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(environment.backEndHost + "/api/list_module");
  }

  public isModuleSuivant(idClient: string, idModule: number): Observable<boolean> {
    const data = {
      idClient: idClient,
      idModule: idModule
    }
    return this.http.post<boolean>(environment.backEndHost + "/api/is_Module_Suivant", data);
  }

  public createFileByModule(fileByModule: FileByModule): Observable<FileByModule> {
    return this.http.post<FileByModule>(environment.backEndHost + "/api/save_file_by_module", fileByModule);
  }

  public getListFileByModule(idModule: number): Observable<Array<FileByModulee>> {
    return this.http.get<Array<FileByModule>>(environment.backEndHost + "/api/file_by_module/" + idModule);
  }

  public addUserByModule(idClient: string, codeModule: number): Observable<void> {
    const data = {
      code: codeModule,
      idUser: idClient
    }
    return this.http.post<void>(environment.backEndHost + "/api/add_client_module", data);
  }

  public getMaxCodeModule(): Observable<number> {
    return this.http.get<number>(environment.backEndHost + "/api/find_maxModule_by_code");
  }

  public getSizeExameByModule(idModule: number): Observable<number> {
    return this.http.get<number>(environment.backEndHost + "/api/size_examen_by_module/" + idModule);
  }


  /**_________uploade file et telecharger____________ */
  public telechargerDoc(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telechargerDoc/" + id, { observe: 'response', responseType: 'blob' });
  }
  public telechargerDocCorrection(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telecharger_correction/" + id, { observe: 'response', responseType: 'blob' });
  }

  public uploadeFile(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload/" + id, formDoc);
  }

  public getFileByModule(idFile: number): Observable<FileByModule> {
    return this.http.get<FileByModule>(environment.backEndHost + "/api/file_by_idModule/" + idFile);
  }


  public uploadeFileExamen(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload_examen/" + id, formDoc);
  }



  /*****______________Examen__________ */
  public saveExamen(data: Examen): Observable<Examen> {
    return this.http.post<Examen>(environment.backEndHost + "/api/save_examen", data);
  }

  public getListExamen(): Observable<Array<ExamenList>> {
    return this.http.get<Array<ExamenList>>(environment.backEndHost + "/api/list_examen");
  }

  public getListExamenBysum(idModule: number): Observable<Array<ExamenByList>> {
    return this.http.get<Array<ExamenByList>>(environment.backEndHost + "/api/list_examen_sum/" + idModule);
  }

  public getListExamenByClient(idClient: string): Observable<Array<ExamenList>> {
    return this.http.get<Array<ExamenList>>(environment.backEndHost + "/api/list_examen_by_client/" + idClient);
  }
  public getListExamenByClientAndModule(idClient: string, idModule: number): Observable<Array<ExamenList>> {
    const data = {
      idModule: idModule,
      idClient: idClient
    }
    return this.http.post<Array<ExamenList>>(environment.backEndHost + "/api/list_examen_by_client_and_module", data);
  }


  public telechargerDocExamen(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telecharger_examen/" + id, { observe: 'response', responseType: 'blob' });
  }

  public annullerExamen(id: number): Observable<Examen> {
    return this.http.get(environment.backEndHost + "/api/examen_annuller/" + id);
  }

  /*****______________correction__________ */

  public saveCorrection(data: CorrectionRequest): Observable<Correction> {
    return this.http.post<Correction>(environment.backEndHost + "/api/correction_save", data);
  }

  public uploadeFileCorrection(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload_correction/" + id, formDoc);
  }

  public getListModuleByClient(idClient: string): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(environment.backEndHost + "/api/list_module_by_client/" + idClient);
  }

  public getListCorrectionClient(idClient: string): Observable<Array<CorrectionList>> {
    return this.http.get<Array<CorrectionList>>(environment.backEndHost + "/api/list_corrections_by_client/" + idClient);
  }



  /*****____________dedie pour images___________________`${environment.backEndHost}/images/${id}` */

  public uploadeImage(formDoc: FormData, id: string): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload_image/" + id, formDoc);
  }

  public uploadeMonImage(formDoc: FormData, id: string): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload_mon_image/" + id, formDoc);
  }

  public getImage(id: string): Observable<Blob> {
    return this.http.get(environment.backEndHost + "/api/telechargerImage/" + id, { responseType: 'blob' });
  }
}
