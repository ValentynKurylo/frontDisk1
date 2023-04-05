import axios from "axios";


const url = "http://localhost:5000/file"

export default class FileService {


    static getFiles(dirId, sort){
        let URL = url
        if (dirId) {
            URL = `${url}/all?parent=${dirId}`
        }
        if (sort) {
            URL = `${url}/all?sort=${sort}`
        }
        if (dirId && sort) {
            URL = `${url}/all?parent=${dirId}&sort=${sort}`
        }
        return axios.get(URL, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    static searchFiles(search, dirId){
        console.log(dirId)
        if(dirId) {
            return axios.get(`${url}/search?search=${search}&parent=${dirId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }else{
            return axios.get(`${url}/search?search=${search}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }
    }

    static createDir(body){
        return axios.post(url, body, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    static postFile(file, dirId){
        const formData = new FormData()
        formData.append('file', file)
        console.log("llll", file)
        if (dirId) {
            formData.append('parent', dirId)
        }
        let uploadFile = {name: file.name, progress: 0, id: Date.now()}
        return axios.post(`${url}/file`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
               onUploadProgress: progressEvent => {
                    if (progressEvent.total) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        console.log(uploadFile)
                        return uploadFile
                    }
                }
            })

    }

    static async downloadFile(file){
        console.log('kkkkkk')
        const response = await fetch(`${url}/download?id=${file._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        console.log(response)
        if(response.status === 200){
            const blob = await response.blob()
            console.log(blob)
            const downloadUrl = window.URL.createObjectURL(blob)
            console.log(downloadUrl)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }
    }

    static deleteFile(file){
        return axios.delete(`${url}/?id=${file._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
    static avatarUpload(file){
        console.log('kkkk')
        const formData = new FormData()
        formData.append('file', file)
        return axios.post(url + '/avatarUpload', formData, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }
    static avatarDelete(){
        return axios.delete(url + '/avatarDelete', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }

}