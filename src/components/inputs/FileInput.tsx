/**
 * Corp Astro UI Library - FileInput Primitive
 * 
 * File upload input component with drag-and-drop support, multiple file selection,
 * file type validation, and comprehensive upload states.
 * 
 * @module FileInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  Platform,
  Image,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

/**
 * FileInput size variants
 */
export type FileInputSize = 'small' | 'medium' | 'large';

/**
 * FileInput variant styles
 */
export type FileInputVariant = 'default' | 'dropzone' | 'button' | 'gallery';

/**
 * FileInput validation state
 */
export type FileInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * File upload status
 */
export type FileUploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * File type
 */
export type FileType = 'image' | 'document' | 'video' | 'audio' | 'any';

/**
 * File object interface
 */
export interface FileObject {
  /** File identifier */
  id: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** File type/MIME type */
  type: string;
  /** File URI */
  uri: string;
  /** Upload status */
  status: FileUploadStatus;
  /** Upload progress (0-100) */
  progress?: number;
  /** Error message if upload failed */
  error?: string;
  /** File thumbnail (for images) */
  thumbnail?: string;
  /** File extension */
  extension?: string;
  /** Last modified date */
  lastModified?: Date;
}

/**
 * File validation rules
 */
export interface FileValidationRules {
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Minimum file size in bytes */
  minSize?: number;
  /** Allowed file types */
  allowedTypes?: string[];
  /** Maximum number of files */
  maxFiles?: number;
  /** Minimum number of files */
  minFiles?: number;
  /** Custom validation function */
  customValidator?: (file: FileObject) => string | null;
}

/**
 * FileInput component props
 */
export interface FileInputProps extends AccessibilityProps {
  /** Currently selected files */
  value?: FileObject[];
  /** Default selected files */
  defaultValue?: FileObject[];
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: FileInputSize;
  /** Visual variant */
  variant?: FileInputVariant;
  /** Validation state */
  validationState?: FileInputValidationState;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Warning message */
  warningMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** File type filter */
  fileType?: FileType;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Enable drag and drop */
  enableDragDrop?: boolean;
  /** Show file preview */
  showPreview?: boolean;
  /** Show upload progress */
  showProgress?: boolean;
  /** File validation rules */
  validationRules?: FileValidationRules;
  /** Upload button text */
  uploadButtonText?: string;
  /** Browse button text */
  browseButtonText?: string;
  /** Drop zone text */
  dropZoneText?: string;
  /** Custom file icons */
  customFileIcons?: Record<string, string>;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom container styles */
  containerStyle?: ViewStyle;
  /** Custom drop zone styles */
  dropZoneStyle?: ViewStyle;
  /** Custom file list styles */
  fileListStyle?: ViewStyle;
  /** Custom label styles */
  labelStyle?: TextStyle;
  /** Custom helper text styles */
  helperTextStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Callback when files change */
  onFilesChange?: (files: FileObject[]) => void;
  /** Callback when file is selected */
  onFileSelect?: (file: FileObject) => void;
  /** Callback when file is removed */
  onFileRemove?: (file: FileObject) => void;
  /** Callback when upload starts */
  onUploadStart?: (file: FileObject) => void;
  /** Callback when upload progresses */
  onUploadProgress?: (file: FileObject, progress: number) => void;
  /** Callback when upload completes */
  onUploadComplete?: (file: FileObject) => void;
  /** Callback when upload fails */
  onUploadError?: (file: FileObject, error: string) => void;
  /** Callback when validation fails */
  onValidationError?: (file: FileObject, error: string) => void;
  /** Custom upload function */
  onUpload?: (file: FileObject) => Promise<void>;
}

/**
 * FileInput Component
 * 
 * A comprehensive file upload component with drag-and-drop support, multiple file selection,
 * file type validation, and upload progress tracking.
 * 
 * @example
 * ```tsx
 * <FileInput
 *   value={files}
 *   onFilesChange={setFiles}
 *   placeholder="Upload files"
 *   label="Documents"
 *   multiple={true}
 *   fileType="document"
 *   validationRules={{
 *     maxSize: 5 * 1024 * 1024, // 5MB
 *     allowedTypes: ['pdf', 'doc', 'docx'],
 *     maxFiles: 5
 *   }}
 * />
 * ```
 */
export const FileInput: React.FC<FileInputProps> = ({
  value = [],
  defaultValue = [],
  placeholder = 'Select files',
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  label,
  helperText,
  errorMessage,
  successMessage,
  warningMessage,
  disabled = false,
  required = false,
  readOnly = false,
  fileType = 'any',
  multiple = false,
  enableDragDrop = true,
  showPreview = true,
  showProgress = true,
  validationRules,
  uploadButtonText = 'Upload',
  browseButtonText = 'Browse',
  dropZoneText = 'Drop files here or click to browse',
  customFileIcons,
  style,
  containerStyle,
  dropZoneStyle,
  fileListStyle,
  labelStyle,
  helperTextStyle,
  testID,
  onFilesChange,
  onFileSelect,
  onFileRemove,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  onValidationError,
  onUpload,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  ...accessibilityProps
}) => {
  // State management
  const [files, setFiles] = useState<FileObject[]>(value || defaultValue);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Refs
  const containerRef = useRef<View>(null);
  const dragAnim = useRef(new Animated.Value(0)).current;
  const uploadAnim = useRef(new Animated.Value(0)).current;

  // File validation
  const validateFile = useCallback((file: FileObject): string | null => {
    if (!validationRules) return null;

    const { maxSize, minSize, allowedTypes, customValidator } = validationRules;

    // Size validation
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }

    if (minSize && file.size < minSize) {
      return `File size must be greater than ${formatFileSize(minSize)}`;
    }

    // Type validation
    if (allowedTypes && allowedTypes.length > 0) {
      const fileExtension = file.extension || file.name.split('.').pop()?.toLowerCase();
      const fileTypeMatch = allowedTypes.some(type => 
        type.toLowerCase() === fileExtension || 
        file.type.toLowerCase().includes(type.toLowerCase())
      );
      
      if (!fileTypeMatch) {
        return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
      }
    }

    // Custom validation
    if (customValidator) {
      return customValidator(file);
    }

    return null;
  }, [validationRules]);

  // File utilities
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }, []);

  const getFileIcon = useCallback((file: FileObject): string => {
    if (customFileIcons && file.extension && customFileIcons[file.extension]) {
      return customFileIcons[file.extension];
    }

    const extension = file.extension || file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📈';
      case 'txt':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎬';
      case 'mp3':
      case 'wav':
      case 'aac':
        return '🎵';
      case 'zip':
      case 'rar':
      case '7z':
        return '📦';
      default:
        return '📄';
    }
  }, [customFileIcons]);



  // File selection handlers with real document picker
  const handleBrowse = useCallback(async () => {
    if (disabled || readOnly) return;

    try {
      // Configure document picker options based on fileType
      let pickerOptions: DocumentPicker.DocumentPickerOptions = {
        multiple: multiple,
        copyToCacheDirectory: true,
      };

      // Set allowed types based on fileType
      switch (fileType) {
        case 'image':
          pickerOptions.type = ['image/*'];
          break;
        case 'document':
          pickerOptions.type = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
          break;
        case 'video':
          pickerOptions.type = ['video/*'];
          break;
        case 'audio':
          pickerOptions.type = ['audio/*'];
          break;
        default:
          pickerOptions.type = ['*/*'];
      }

      const result = await DocumentPicker.getDocumentAsync(pickerOptions);

      if (!result.canceled && result.assets) {
        const selectedFiles: FileObject[] = [];

        for (const asset of result.assets) {
          const file: FileObject = {
            id: `${Date.now()}-${Math.random()}`,
            name: asset.name || 'Unknown file',
            size: asset.size || 0,
            type: asset.mimeType || 'application/octet-stream',
            uri: asset.uri,
            status: 'idle',
            extension: asset.name?.split('.').pop()?.toLowerCase(),
            lastModified: new Date(),
          };

          const validationError = validateFile(file);
          if (validationError) {
            onValidationError?.(file, validationError);
            Alert.alert('Validation Error', validationError);
            continue;
          }

          selectedFiles.push(file);
        }

        if (selectedFiles.length > 0) {
          const updatedFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
          setFiles(updatedFiles);
          onFilesChange?.(updatedFiles);
          selectedFiles.forEach(file => onFileSelect?.(file));
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  }, [disabled, readOnly, fileType, multiple, files, validateFile, onFilesChange, onFileSelect, onValidationError]);

  // File management
  const handleFileRemove = useCallback((fileToRemove: FileObject) => {
    const updatedFiles = files.filter(file => file.id !== fileToRemove.id);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    onFileRemove?.(fileToRemove);
  }, [files, onFilesChange, onFileRemove]);

  const handleFileUpload = useCallback(async (file: FileObject) => {
    if (!onUpload) return;

    try {
      setIsUploading(true);
      onUploadStart?.(file);
      
      // Update file status
      const updatedFile = { ...file, status: 'uploading' as FileUploadStatus };
      const updatedFiles = files.map(f => f.id === file.id ? updatedFile : f);
      setFiles(updatedFiles);
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        updatedFile.progress = progress;
        onUploadProgress?.(updatedFile, progress);
      }

      await onUpload(file);
      
      // Update file status to success
      const successFile = { ...updatedFile, status: 'success' as FileUploadStatus, progress: 100 };
      const finalFiles = files.map(f => f.id === file.id ? successFile : f);
      setFiles(finalFiles);
      onUploadComplete?.(successFile);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      const errorFile = { ...file, status: 'error' as FileUploadStatus, error: errorMessage };
      const errorFiles = files.map(f => f.id === file.id ? errorFile : f);
      setFiles(errorFiles);
      onUploadError?.(errorFile, errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [files, onUpload, onUploadStart, onUploadProgress, onUploadComplete, onUploadError]);

  // Helper text based on validation state
  const getHelperText = () => {
    switch (validationState) {
      case 'error':
        return errorMessage || 'Please fix the errors';
      case 'success':
        return successMessage || 'Files uploaded successfully';
      case 'warning':
        return warningMessage || 'Please review the files';
      default:
        return helperText;
    }
  };

  // Drag and drop handlers (for web compatibility)
  const handleDragEnter = useCallback((e: any) => {
    if (!enableDragDrop || disabled || readOnly) return;
    
    e.preventDefault();
    setIsDragOver(true);
    
    Animated.timing(dragAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [enableDragDrop, disabled, readOnly, dragAnim]);

  const handleDragLeave = useCallback((e: any) => {
    if (!enableDragDrop) return;
    
    e.preventDefault();
    setIsDragOver(false);
    
    Animated.timing(dragAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [enableDragDrop, dragAnim]);

  const handleDrop = useCallback((e: any) => {
    if (!enableDragDrop || disabled || readOnly) return;
    
    e.preventDefault();
    setIsDragOver(false);
    
    Animated.timing(dragAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    // Handle dropped files (web only)
    if (Platform.OS === 'web' && e.dataTransfer?.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      // Process dropped files...
    }
  }, [enableDragDrop, disabled, readOnly, dragAnim]);

  // Animations
  useEffect(() => {
    if (isUploading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(uploadAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(uploadAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      uploadAnim.setValue(0);
    }
  }, [isUploading, uploadAnim]);

  // Render file item
  const renderFileItem = ({ item }: { item: FileObject }) => {
    const fileItemSizeStyle = size === 'small' ? styles.fileItemSmall : 
                             size === 'large' ? styles.fileItemLarge : 
                             styles.fileItemMedium;
    
    return (
      <View style={[styles.fileItem, fileItemSizeStyle]}>
        <View style={styles.fileInfo}>
          {showPreview && item.thumbnail ? (
            <Image source={{ uri: item.thumbnail }} style={styles.fileThumbnail} />
          ) : (
            <Text style={styles.fileIcon}>{getFileIcon(item)}</Text>
          )}
          
          <View style={styles.fileDetails}>
            <Text style={styles.fileName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.fileSize}>
              {formatFileSize(item.size)}
            </Text>
            
            {showProgress && item.status === 'uploading' && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${item.progress || 0}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {item.progress || 0}%
                </Text>
              </View>
            )}
            
            {item.status === 'error' && (
              <Text style={styles.errorText}>
                {item.error || 'Upload failed'}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.fileActions}>
          {item.status === 'idle' && onUpload && (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleFileUpload(item)}
              disabled={isUploading}
            >
              <Text style={styles.uploadButtonText}>
                {uploadButtonText}
              </Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'uploading' && (
            <ActivityIndicator size="small" color="#2E86DE" />
          )}
          
          {item.status === 'success' && (
            <Text style={styles.successIcon}>✓</Text>
          )}
          
          {item.status === 'error' && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => handleFileUpload(item)}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleFileRemove(item)}
          >
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Get styles based on props
  const labelSizeStyle = size === 'small' ? styles.labelSmall : 
                        size === 'large' ? styles.labelLarge : 
                        styles.labelMedium;

  const containerSizeStyle = size === 'small' ? styles.inputContainerSmall : 
                            size === 'large' ? styles.inputContainerLarge : 
                            styles.inputContainerMedium;

  const containerVariantStyle = variant === 'dropzone' ? styles.inputContainerDropzone : 
                               variant === 'button' ? styles.inputContainerButton : 
                               variant === 'gallery' ? styles.inputContainerGallery : 
                               styles.inputContainerDefault;

  const containerValidationStyle = validationState === 'error' ? styles.inputContainerError : 
                                  validationState === 'success' ? styles.inputContainerSuccess : 
                                  validationState === 'warning' ? styles.inputContainerWarning : 
                                  {};

  const helperTextValidationStyle = validationState === 'error' ? styles.helperTextError : 
                                   validationState === 'success' ? styles.helperTextSuccess : 
                                   validationState === 'warning' ? styles.helperTextWarning : 
                                   styles.helperTextDefault;

  return (
    <View style={[styles.container, containerStyle]} ref={containerRef}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelSizeStyle, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      {/* File Input Area */}
      <Animated.View
        style={[
          styles.inputContainer,
          containerSizeStyle,
          containerVariantStyle,
          containerValidationStyle,
          disabled && styles.inputContainerDisabled,
          isDragOver && styles.inputContainerDragOver,
          {
            borderColor: dragAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(46,134,222,0.2)', 'rgba(46,134,222,0.6)'],
            }),
          },
          dropZoneStyle,
          style,
        ]}
        onLayout={(e: LayoutChangeEvent) => {
          if (Platform.OS === 'web') {
            const element = e.target as any;
            element.addEventListener('dragenter', handleDragEnter);
            element.addEventListener('dragover', handleDragEnter);
            element.addEventListener('dragleave', handleDragLeave);
            element.addEventListener('drop', handleDrop);
          }
        }}
      >
        {variant === 'dropzone' ? (
          <TouchableOpacity
            style={styles.dropZone}
            onPress={handleBrowse}
            disabled={disabled || readOnly}
            accessibilityLabel={accessibilityLabel || `${label || 'File input'} drop zone`}
            accessibilityHint={accessibilityHint || 'Tap to browse files or drag files here'}
            accessibilityRole={accessibilityRole}
            testID={testID}
            {...accessibilityProps}
          >
            <Text style={styles.dropZoneIcon}>📁</Text>
            <Text style={styles.dropZoneText}>
              {isDragOver ? 'Drop files here' : dropZoneText}
            </Text>
            <Text style={styles.dropZoneSubtext}>
              {validationRules?.maxSize && `Max size: ${formatFileSize(validationRules.maxSize)}`}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.browseButton}
            onPress={handleBrowse}
            disabled={disabled || readOnly}
            accessibilityLabel={accessibilityLabel || `${label || 'File input'} browse button`}
            accessibilityHint={accessibilityHint || 'Tap to browse files'}
            accessibilityRole={accessibilityRole}
            testID={testID}
            {...accessibilityProps}
          >
            <Text style={styles.browseButtonText}>
              {browseButtonText}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {/* File List */}
      {files.length > 0 && (
        <View style={[styles.fileList, fileListStyle]}>
          <FlatList
            data={files}
            renderItem={renderFileItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.fileSeparator} />}
          />
        </View>
      )}
      
      {/* Helper Text */}
      {getHelperText() && (
        <Text style={[
          styles.helperText,
          helperTextValidationStyle,
          helperTextStyle
        ]}>
          {getHelperText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  
  // Label styles
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  labelSmall: {
    fontSize: 12,
  },
  labelMedium: {
    fontSize: 14,
  },
  labelLarge: {
    fontSize: 16,
  },
  required: {
    color: '#FF6B6B',
  },
  
  // Input container styles
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(22,33,62,0.2)',
    overflow: 'hidden',
  },
  inputContainerSmall: {
    minHeight: 80,
  },
  inputContainerMedium: {
    minHeight: 120,
  },
  inputContainerLarge: {
    minHeight: 160,
  },
  inputContainerDefault: {
    backgroundColor: 'rgba(22,33,62,0.2)',
  },
  inputContainerDropzone: {
    backgroundColor: 'rgba(22,33,62,0.1)',
    borderStyle: 'dashed',
  },
  inputContainerButton: {
    backgroundColor: 'rgba(22,33,62,0.3)',
  },
  inputContainerGallery: {
    backgroundColor: 'rgba(22,33,62,0.15)',
  },
  inputContainerError: {
    borderColor: 'rgba(255,107,107,0.5)',
  },
  inputContainerSuccess: {
    borderColor: 'rgba(46,213,115,0.5)',
  },
  inputContainerWarning: {
    borderColor: 'rgba(255,159,67,0.5)',
  },
  inputContainerDisabled: {
    opacity: 0.6,
  },
  inputContainerDragOver: {
    backgroundColor: 'rgba(46,134,222,0.1)',
  },
  
  // Drop zone styles
  dropZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dropZoneIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  dropZoneText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  dropZoneSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  
  // Browse button styles
  browseButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  browseButtonText: {
    fontSize: 16,
    color: '#2E86DE',
    fontWeight: '600',
  },
  
  // File list styles
  fileList: {
    marginTop: 16,
    maxHeight: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(22,33,62,0.1)',
    padding: 8,
  },
  fileSeparator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 4,
  },
  
  // File item styles
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(22,33,62,0.2)',
  },
  fileItemSmall: {
    padding: 8,
  },
  fileItemMedium: {
    padding: 12,
  },
  fileItemLarge: {
    padding: 16,
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  fileIcon: {
    fontSize: 24,
    marginRight: 12,
    textAlign: 'center',
    width: 40,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  
  // Progress styles
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E86DE',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: '#2E86DE',
    fontWeight: '600',
  },
  
  // File actions styles
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2E86DE',
  },
  uploadButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  retryButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,159,67,0.2)',
  },
  retryButtonText: {
    fontSize: 10,
    color: '#FF9F43',
    fontWeight: '600',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,107,107,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  successIcon: {
    fontSize: 16,
    color: '#2EDD75',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 10,
    color: '#FF6B6B',
    marginTop: 2,
  },
  
  // Helper text styles
  helperText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
  },
  helperTextDefault: {
    color: 'rgba(255,255,255,0.6)',
  },
  helperTextError: {
    color: '#FF6B6B',
  },
  helperTextSuccess: {
    color: '#2EDD75',
  },
  helperTextWarning: {
    color: '#FF9F43',
  },
});
