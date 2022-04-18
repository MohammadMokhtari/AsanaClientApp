import { UserFileUploadService } from './user-FileUpload.service';
import { Component, Input, OnInit, Self } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './user-file-upload.component.html',
  styleUrls: ['./user-file-upload.component.scss'],
  providers: [UserFileUploadService],
})
export class UserFileUploadComponent implements OnInit {
  constructor(@Self() private fileUploadServiec: UserFileUploadService) {}

  @Input() url: string = '';

  public blankUrl: string =
    'https://localhost:44373/media/images/profile/blank.jpg';

  public previousUrl: string;

  isUploadProgres: boolean = false;

  fileUploadProgres: number = 0;

  selectedFile: File | null;

  ngOnInit(): void {
    this.previousUrl = this.url;
  }

  onRemove(): void {
    const swlResut = Swal.fire({
      title: 'حذف عکس',
      html: '<h6>آیا از حذف عکس پروفایل مطمعن هستید؟</h6>',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'بیخیال',
      cancelButtonColor: '#f1416c',
      confirmButtonColor: '#009ef7',
      confirmButtonText: 'حذف بشه',
    });
    swlResut.then((res) => {
      if (res.isConfirmed) {
        this.fileUploadServiec.removeUserPhoto().subscribe((res) => {
          this.selectedFile = null;
          this.url = this.blankUrl;
        });
      } else if (res.isDenied || res.dismiss) {
        return;
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event?.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  onUpload(): void {
    this.isUploadProgres = true;
    const fd = new FormData();
    fd.append('image', this.selectedFile!);
    this.fileUploadServiec.uploadUserPhoto(fd).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUploadProgres = Math.round(
            (event.loaded / event.total!) * 100
          );
        } else if (event.type == HttpEventType.Response) {
          this.isUploadProgres = false;
          this.selectedFile = null;
        }
      },
      (error) => {
        Swal.fire('عملیات با شکست مواجه شد!', error, 'error');
        this.isUploadProgres = false;
        this.selectedFile = null;
        this.url = this.previousUrl;
      }
    );
  }
}
