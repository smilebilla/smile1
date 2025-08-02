/**
 * Corp Astro UI Library - FileInput Test Component
 * 
 * Test component for the FileInput primitive showcasing all variants,
 * sizes, states, and functionality.
 * 
 * @module FileInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { FileInput, FileObject, FileInputSize, FileInputVariant, FileInputValidationState } from '../FileInput';

/**
 * Test component for FileInput primitive
 */
export const FileInputTest: React.FC = () => {
  // State for different test scenarios
  const [basicFiles, setBasicFiles] = useState<FileObject[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<FileObject[]>([]);
  const [imageFiles, setImageFiles] = useState<FileObject[]>([]);
  const [documentFiles, setDocumentFiles] = useState<FileObject[]>([]);
  const [validationFiles, setValidationFiles] = useState<FileObject[]>([]);
  const [uploadFiles, setUploadFiles] = useState<FileObject[]>([]);
  
  // Configuration states
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [required, setRequired] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [enableDragDrop, setEnableDragDrop] = useState(true);

  // Mock upload function
  const mockUpload = async (file: FileObject): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve();
        } else {
          reject(new Error('Upload failed - network error'));
        }
      }, 2000);
    });
  };

  // File change handlers
  const handleBasicFilesChange = (files: FileObject[]) => {
    setBasicFiles(files);
    console.log('Basic files changed:', files);
  };

  const handleMultipleFilesChange = (files: FileObject[]) => {
    setMultipleFiles(files);
    console.log('Multiple files changed:', files);
  };

  const handleImageFilesChange = (files: FileObject[]) => {
    setImageFiles(files);
    console.log('Image files changed:', files);
  };

  const handleDocumentFilesChange = (files: FileObject[]) => {
    setDocumentFiles(files);
    console.log('Document files changed:', files);
  };

  const handleValidationFilesChange = (files: FileObject[]) => {
    setValidationFiles(files);
    console.log('Validation files changed:', files);
  };

  const handleUploadFilesChange = (files: FileObject[]) => {
    setUploadFiles(files);
    console.log('Upload files changed:', files);
  };

  // Event handlers
  const handleFileSelect = (file: FileObject) => {
    console.log('File selected:', file);
  };

  const handleFileRemove = (file: FileObject) => {
    console.log('File removed:', file);
  };

  const handleUploadStart = (file: FileObject) => {
    console.log('Upload started:', file);
  };

  const handleUploadProgress = (file: FileObject, progress: number) => {
    console.log('Upload progress:', file.name, progress);
  };

  const handleUploadComplete = (file: FileObject) => {
    console.log('Upload completed:', file);
    Alert.alert('Success', `File "${file.name}" uploaded successfully!`);
  };

  const handleUploadError = (file: FileObject, error: string) => {
    console.log('Upload error:', file, error);
    Alert.alert('Upload Error', `Failed to upload "${file.name}": ${error}`);
  };

  const handleValidationError = (file: FileObject, error: string) => {
    console.log('Validation error:', file, error);
    Alert.alert('Validation Error', `File "${file.name}" failed validation: ${error}`);
  };

  const sizes: FileInputSize[] = ['small', 'medium', 'large'];
  const variants: FileInputVariant[] = ['default', 'dropzone', 'button', 'gallery'];
  const validationStates: FileInputValidationState[] = ['default', 'error', 'success', 'warning'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>FileInput Test Component</Text>
        <Text style={styles.subtitle}>
          Comprehensive testing of FileInput primitive with all variants, sizes, states, and functionality.
        </Text>

        {/* Configuration Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Disabled:</Text>
            <Switch value={disabled} onValueChange={setDisabled} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Read Only:</Text>
            <Switch value={readOnly} onValueChange={setReadOnly} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Required:</Text>
            <Switch value={required} onValueChange={setRequired} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Preview:</Text>
            <Switch value={showPreview} onValueChange={setShowPreview} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Progress:</Text>
            <Switch value={showProgress} onValueChange={setShowProgress} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Enable Drag & Drop:</Text>
            <Switch value={enableDragDrop} onValueChange={setEnableDragDrop} />
          </View>
        </View>

        {/* Basic FileInput */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic FileInput</Text>
          <FileInput
            value={basicFiles}
            onFilesChange={handleBasicFilesChange}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            label="Basic File Upload"
            placeholder="Select a file"
            helperText="Choose any type of file"
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            showPreview={showPreview}
            showProgress={showProgress}
            enableDragDrop={enableDragDrop}
            testID="basic-file-input"
          />
        </View>

        {/* Multiple Files */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Multiple Files</Text>
          <FileInput
            value={multipleFiles}
            onFilesChange={handleMultipleFilesChange}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            label="Multiple File Upload"
            placeholder="Select multiple files"
            helperText="You can select multiple files at once"
            multiple={true}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            showPreview={showPreview}
            showProgress={showProgress}
            enableDragDrop={enableDragDrop}
            testID="multiple-file-input"
          />
        </View>

        {/* Size Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size Variants</Text>
          {sizes.map((size) => (
            <View key={size} style={styles.variantContainer}>
              <Text style={styles.variantLabel}>{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
              <FileInput
                size={size}
                label={`${size.charAt(0).toUpperCase() + size.slice(1)} File Input`}
                placeholder={`Select files (${size})`}
                helperText={`This is a ${size} file input`}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                showPreview={showPreview}
                showProgress={showProgress}
                enableDragDrop={enableDragDrop}
                testID={`${size}-file-input`}
              />
            </View>
          ))}
        </View>

        {/* Variant Styles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Variant Styles</Text>
          {variants.map((variant) => (
            <View key={variant} style={styles.variantContainer}>
              <Text style={styles.variantLabel}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Text>
              <FileInput
                variant={variant}
                label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} File Input`}
                placeholder={`Select files (${variant})`}
                helperText={`This is a ${variant} file input`}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                showPreview={showPreview}
                showProgress={showProgress}
                enableDragDrop={enableDragDrop}
                testID={`${variant}-file-input`}
              />
            </View>
          ))}
        </View>

        {/* Validation States */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Validation States</Text>
          {validationStates.map((state) => (
            <View key={state} style={styles.variantContainer}>
              <Text style={styles.variantLabel}>{state.charAt(0).toUpperCase() + state.slice(1)}</Text>
              <FileInput
                validationState={state}
                label={`${state.charAt(0).toUpperCase() + state.slice(1)} File Input`}
                placeholder={`Select files (${state})`}
                helperText={state === 'default' ? 'This is a default file input' : undefined}
                errorMessage={state === 'error' ? 'This is an error message' : undefined}
                successMessage={state === 'success' ? 'Files uploaded successfully!' : undefined}
                warningMessage={state === 'warning' ? 'Please review your files' : undefined}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                showPreview={showPreview}
                showProgress={showProgress}
                enableDragDrop={enableDragDrop}
                testID={`${state}-file-input`}
              />
            </View>
          ))}
        </View>

        {/* File Type Filtering */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File Type Filtering</Text>
          
          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Images Only</Text>
            <FileInput
              value={imageFiles}
              onFilesChange={handleImageFilesChange}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              fileType="image"
              label="Image Files"
              placeholder="Select images"
              helperText="Only image files are allowed"
              multiple={true}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              showPreview={showPreview}
              showProgress={showProgress}
              enableDragDrop={enableDragDrop}
              testID="image-file-input"
            />
          </View>

          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Documents Only</Text>
            <FileInput
              value={documentFiles}
              onFilesChange={handleDocumentFilesChange}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              fileType="document"
              label="Document Files"
              placeholder="Select documents"
              helperText="Only document files are allowed"
              multiple={true}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              showPreview={showPreview}
              showProgress={showProgress}
              enableDragDrop={enableDragDrop}
              testID="document-file-input"
            />
          </View>
        </View>

        {/* File Validation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File Validation</Text>
          <FileInput
            value={validationFiles}
            onFilesChange={handleValidationFilesChange}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onValidationError={handleValidationError}
            label="Validated File Upload"
            placeholder="Select files (with validation)"
            helperText="Max 2MB per file, max 3 files, PDF/DOC only"
            multiple={true}
            validationRules={{
              maxSize: 2 * 1024 * 1024, // 2MB
              maxFiles: 3,
              allowedTypes: ['pdf', 'doc', 'docx'],
              customValidator: (file) => {
                if (file.name.includes('test')) {
                  return 'Files containing "test" in the name are not allowed';
                }
                return null;
              }
            }}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            showPreview={showPreview}
            showProgress={showProgress}
            enableDragDrop={enableDragDrop}
            testID="validation-file-input"
          />
        </View>

        {/* Upload Functionality */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Functionality</Text>
          <FileInput
            value={uploadFiles}
            onFilesChange={handleUploadFilesChange}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onUpload={mockUpload}
            onUploadStart={handleUploadStart}
            onUploadProgress={handleUploadProgress}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            label="Upload with Progress"
            placeholder="Select files to upload"
            helperText="Files will be uploaded automatically with progress tracking"
            multiple={true}
            uploadButtonText="Upload Now"
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            showPreview={showPreview}
            showProgress={showProgress}
            enableDragDrop={enableDragDrop}
            testID="upload-file-input"
          />
        </View>

        {/* Custom Styling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styling</Text>
          <FileInput
            label="Custom Styled File Input"
            placeholder="Custom styled file input"
            helperText="This file input has custom styling"
            variant="dropzone"
            size="large"
            style={styles.customInput}
            containerStyle={styles.customContainer}
            labelStyle={styles.customLabel}
            helperTextStyle={styles.customHelperText}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            showPreview={showPreview}
            showProgress={showProgress}
            enableDragDrop={enableDragDrop}
            testID="custom-styled-file-input"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  variantContainer: {
    marginBottom: 16,
  },
  variantLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderRadius: 8,
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  customContainer: {
    borderColor: 'rgba(46,134,222,0.5)',
    borderWidth: 2,
  },
  customInput: {
    backgroundColor: 'rgba(46,134,222,0.1)',
  },
  customLabel: {
    color: '#2E86DE',
    fontWeight: 'bold',
  },
  customHelperText: {
    color: '#2E86DE',
    fontStyle: 'italic',
  },
});

export default FileInputTest;
