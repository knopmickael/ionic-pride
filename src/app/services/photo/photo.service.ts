import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  private PHOTO_STORAGE: string = 'profile-pictures';

  constructor(private platform: Platform) {}

  public async fetchByUserID(uId: number) {
    
    const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
    let photos = JSON.parse(photoList.value) || [];

    if (!photos.length)
      return false;

    let photo = photos.find(p => p.userId === uId);

    if (this.platform.is('hybrid')) {
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data,
      });
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }

    return photo;
  }

  public async openCameraPlugin() {

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return capturedPhoto;
  }

  public async persistPicture(generatedPicture: Photo, userId: number) {
    
    const savedImageFile = await this.savePicture(generatedPicture, userId);

    const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
    let photos = JSON.parse(photoList.value) || [];

    let index = photos.findIndex(p => p.userId === userId);
    if (index !== -1)
      photos.splice(index, 1);
    
    photos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(photos)
    });
  }

  private async savePicture(photo: Photo, userId: number) {

    const base64Data = await this.readAsBase64(photo);

    const fileName = 'profile.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      return {
        userId: userId,
        base64: base64Data,
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        userId: userId,
        base64: base64Data,
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  public async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  public async deletePicture(userId: number) {

    const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
    let photos = JSON.parse(photoList.value) || [];
    
    let index = photos.findIndex(p => p.userId === userId);
    if (index === -1)
      return false;

    photos.splice(index, 1);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(photos)
    });

    if (this.platform.is('hybrid')) {
      let photo = await this.fetchByUserID(userId);
      const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
      });
    }

    return true;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

export interface UserPhoto {
  userId: number;
  base64: string;
  filepath: string;
  webviewPath: string;
}
