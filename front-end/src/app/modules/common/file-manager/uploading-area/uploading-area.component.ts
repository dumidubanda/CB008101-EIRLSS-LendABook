import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FileManagerService} from '../../../../services/file-manager.service';
import {ACTIONS} from '../../../../lookups/app.lookups';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-uploading-area',
  templateUrl: './uploading-area.component.html',
  styleUrls: ['./uploading-area.component.css']
})
export class UploadingAreaComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() filesList: any[];
  @Input() loading;
  @Input() readonly;
  @Output() fileEvent: EventEmitter<any> =  new EventEmitter();
  filesQueue: any[] = [];
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public uploader: FileUploader = new FileUploader({url: URL, disableMultipart: true});


  constructor(private _FileManagerService: FileManagerService) { }
  ngOnInit(): void {}

  onAreaClick(): void{
    const inputElement: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    inputElement.click();
  }
  fileOverBase(e: any): void {this.hasBaseDropZoneOver = e;}
  fileOverAnother(e: any): void {this.hasAnotherDropZoneOver = e;}

  // ------------ on file selected ------------------
  onFileSelected(event: any): void {
    const ref = this;
    if ( event && event.length > 0){
      for ( let i = 0; i <  event.length; i++){
        const file: File = event[i];
        this._FileManagerService.readFileBytes(file).then((data) => {
          ref.filesQueue.push({fileName: file.name, fileSize: file.size, fileType: file.type, content: data});
          ref.fileEvent.emit({action: "FILES", filesQueue: ref.filesQueue});
        });
      }
    }
  }

  // ------------- delete file ---------------
  deleteFile = (file, index) => this.fileEvent.emit({action: ACTIONS.DELETE, file: file, index: index});

  // ------------- delete file from uploader queue ---------------
  deleteQueueFile(item: any, index): void{
    item.remove();
    this.filesQueue.splice(index, 1);
    this.fileEvent.emit({action: "FILES", filesQueue: this.filesQueue});
  }

  // ------------- delete file from uploader queue ---------------
  downloadFile = (item: any) => this._FileManagerService.downloadFile(item.content, item.fileType, item.fileName, item.filePath);

  // --------------- clear queue ---------------
  clearQueue(): void{
    this.uploader.queue.length = 0;
  }
}
