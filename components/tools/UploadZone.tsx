"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface UploadZoneProps {
  label: string
  onFileUpload?: (files: File[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
  maxFileSize?: number // in MB
}

export default function UploadZone({
  label,
  onFileUpload,
  acceptedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".txt"],
  maxFiles = 10,
  maxFileSize = 25,
}: UploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const validFiles = Array.from(files).filter((file) => {
      const sizeInMB = file.size / (1024 * 1024)
      return sizeInMB <= maxFileSize
    })

    const newFiles = validFiles.slice(0, maxFiles - uploadedFiles.length)

    // Simulate upload progress
    newFiles.forEach((file) => {
      const fileName = file.name
      setUploadProgress((prev) => ({ ...prev, [fileName]: 0 }))

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const currentProgress = prev[fileName] || 0
          if (currentProgress >= 100) {
            clearInterval(interval)
            return prev
          }
          return { ...prev, [fileName]: currentProgress + 10 }
        })
      }, 100)
    })

    const updatedFiles = [...uploadedFiles, ...newFiles]
    setUploadedFiles(updatedFiles)
    onFileUpload?.(updatedFiles)
  }

  const removeFile = (index: number) => {
    const fileToRemove = uploadedFiles[index]
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)

    // Remove progress tracking
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[fileToRemove.name]
      return newProgress
    })

    onFileUpload?.(updatedFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all ${
          isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
          <p className="text-gray-500 mb-4">Supported formats: {acceptedTypes.join(", ")}</p>
          <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700 text-white">
            Choose Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <p className="text-xs text-gray-400 mt-2">
            Max {maxFiles} files, up to {maxFileSize}MB each
          </p>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Uploaded Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file, index) => {
            const progress = uploadProgress[file.name] || 100
            const isUploading = progress < 100

            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <File className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    {isUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isUploading ? (
                    <div className="text-xs text-blue-600">{progress}%</div>
                  ) : (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  <button onClick={() => removeFile(index)} className="p-1 hover:bg-gray-200 rounded">
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
