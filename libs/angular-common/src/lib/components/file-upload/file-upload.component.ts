import { Component, EventEmitter, Input, Output } from "@angular/core";
// const illegals = /(\.[^/.]+$)/g;
// const spaces = /[^-_\w\d]/g;

@Component({
    selector: 'onivoro-file-upload',
    templateUrl: "file-upload.component.html",
    styles: [`.file-input { display: none; }`]
})
export class FileUploadComponent {

    @Input() extensions = '.jpg,.jpeg,.doc,.docx,.odt,.txt,.pdf,.png,.pdf,.rtf,.webp,.csv';
    @Input() label = 'Add Files';
    @Input() icon = 'attach_file';
    @Output() upload = new EventEmitter<FormData | null>();
    @Output() attach = new EventEmitter<File[] | null>();
    @Output() error = new EventEmitter();
    @Input() limit!: number;
    formData = new FormData();
    filez: Record<string, File> = {};

    get filenames () {
        return Object.keys(this.filez);
    }

    onFileSelected(event: any) {
        const files: FileList = event.target.files;

        for (let index = 0; index < files.length; index++) {
            const file = (event.target.files[index]);
            this.filez[file.name] = file;
        }

        this.emit();
    }

    onFileRemoved(filename: string) {
        delete this.filez[filename];

        this.emit();
    }

    emit() {
        this.formData = new FormData();

        const files = Object.values(this.filez);

        if (!files?.length) {
            this.attach.emit(null);
            this.upload.emit(null);
        }

        for (let index = 0; index < files.length; index++) {
            const file = (files[index]);
            const reader = new FileReader();
            reader.onerror = (error) => {
                this.error.next(error);
                console.warn({ error })
            };
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const fileString: any = e?.target?.result;

                if (fileString) {
                    this.formData.append('files[]', file, file.name);

                    this.attach.emit(files);
                    this.upload.emit(this.formData);
                }
            }

            reader.readAsDataURL(file);
        }
    }
}