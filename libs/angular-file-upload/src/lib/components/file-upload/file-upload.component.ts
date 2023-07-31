import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { SnackService } from '../../services/snack.service';
// const illegals = /(\.[^/.]+$)/g;
// const spaces = /[^-_\w\d]/g;

@Component({
  selector: 'evo-file-upload',
  templateUrl: 'file-upload.component.html',
  styles: [
    `
      .file-input {
        display: none;
      }
    `,
  ],
})
export class FileUploadComponent implements OnInit {
  @Input() extensions = '.jpg,.jpeg,.doc,.docx,.odt,.txt,.pdf';
  @Input() label = 'Browse';
  @Input() icon = 'folder_open';
  @Output() upload = new EventEmitter<FormData | null>();
  @Output() attach = new EventEmitter<{
    files: File[];
    formData: FormData;
  } | null>();
  @Output() error = new EventEmitter();
  @Input() limit: number;
  formData = new FormData();
  filez: Record<string, File> = {};
  supportedExtensions: string[];

  get filenames() {
    return Object.keys(this.filez);
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    this._selectFile(files, event.target.files);
  }

  private _selectFile(files: FileList, filez: any) {
    const currentCount = (this.files?.length || 0);
    if (this.limit && ((currentCount + files.length) > this.limit)) {
      const remaining = (this.limit - currentCount) ? ` You can add up to ${this.limit - currentCount} more files.` : '';
      this.error.emit(`The maximum number of files per upload is ${this.limit}.${remaining}`);
      return;
    }

    let supportedFilesUploaded = false;
    let unsupportedFiles = [];
    for (let index = 0; index < files.length; index++) {
      const file = filez[index];
      if (this.isSupported(file)) {
        supportedFilesUploaded = true;
        this.filez[file.name] = file;
      } else {
        unsupportedFiles.push(file);
      }
    }

    if (supportedFilesUploaded) {
      this.emit();
    }

    if (unsupportedFiles.length) {
      this.error.emit(`Unable to accept ${unsupportedFiles.length} unsupported file(s): ${unsupportedFiles.map(f => `"${f.name}"`).join(', ')}`);
    }
  }

  private isSupported(f: File) {
    const ext = f.name?.split('.')?.pop() || 'not supported';
    return this.supportedExtensions.includes(`.${ext}`);
  }

  onDrop($event: any) {
    if ($event?.dataTransfer?.files) {
      this._selectFile($event.dataTransfer.files, $event.dataTransfer.files);
    }
  }

  onFileRemoved(filename: string) {
    delete this.filez[filename];

    this.emit();
  }

  get files() {
    return Object.values(this.filez);
  }

  emit() {
    this.formData = new FormData();

    const files = this.files;

    if (!files?.length) {
      this.attach.emit(null);
      this.upload.emit(null);
    }

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const reader = new FileReader();
      reader.onerror = (error) => {
        this.error.emit(error);
        console.warn({ error });
      };
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileString: any = e?.target?.result;

        if (fileString) {
          this.formData.append('files[]', file, file.name);

          this.attach.emit({ files, formData: this.formData });
          this.upload.emit(this.formData);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.supportedExtensions = this.extensions.split(',').map(x => x.trim());
  }
}
