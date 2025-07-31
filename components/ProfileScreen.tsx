import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, CreditCard as Edit3, Calendar, MapPin, Phone, Mail, Clock, Star, Crown, Camera, Save, X } from 'lucide-react-native';

interface ProfileScreenProps {
  onClose: () => void;
}

export default function ProfileScreen({ onClose }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    dateOfBirth: '15/08/1985',
    timeOfBirth: '14:30',
    placeOfBirth: 'Mumbai, Maharashtra',
    gender: 'Male',
    maritalStatus: 'Married',
  });

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
  };

  const profileFields = [
    { key: 'name', label: 'Full Name', icon: User, editable: true },
    { key: 'email', label: 'Email', icon: Mail, editable: true },
    { key: 'phone', label: 'Phone Number', icon: Phone, editable: true },
    { key: 'dateOfBirth', label: 'Date of Birth', icon: Calendar, editable: true },
    { key: 'timeOfBirth', label: 'Time of Birth', icon: Clock, editable: true },
    { key: 'placeOfBirth', label: 'Place of Birth', icon: MapPin, editable: true },
    { key: 'gender', label: 'Gender', icon: User, editable: true },
    { key: 'maritalStatus', label: 'Marital Status', icon: User, editable: true },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#4c1d95']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <Save size={24} color="#ffd700" />
            ) : (
              <Edit3 size={24} color="#ffd700" />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#7c3aed', '#a855f7']}
                style={styles.avatarGradient}
              >
                <User size={40} color="#ffffff" />
              </LinearGradient>
              {isEditing && (
                <TouchableOpacity style={styles.cameraButton}>
                  <Camera size={16} color="#ffffff" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <View style={styles.premiumBadge}>
              <Crown size={16} color="#ffd700" />
              <Text style={styles.premiumText}>Premium Member</Text>
            </View>
          </View>

          {/* Profile Stats */}
          <View style={styles.statsContainer}>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.statsGradient}
            >
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>25</Text>
                <Text style={styles.statLabel}>Reports Generated</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>150</Text>
                <Text style={styles.statLabel}>Charts Created</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
                <Star size={12} color="#ffd700" />
              </View>
            </LinearGradient>
          </View>

          {/* Profile Fields */}
          <View style={styles.fieldsContainer}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            {profileFields.map((field, index) => {
              const IconComponent = field.icon;
              return (
                <View key={index} style={styles.fieldContainer}>
                  <LinearGradient
                    colors={['#1e1b4b', '#312e81']}
                    style={styles.fieldGradient}
                  >
                    <View style={styles.fieldIcon}>
                      <IconComponent size={20} color="#8b5cf6" />
                    </View>
                    <View style={styles.fieldContent}>
                      <Text style={styles.fieldLabel}>{field.label}</Text>
                      {isEditing && field.editable ? (
                        <TextInput
                          style={styles.fieldInput}
                          value={profileData[field.key as keyof typeof profileData]}
                          onChangeText={(text) =>
                            setProfileData(prev => ({ ...prev, [field.key]: text }))
                          }
                          placeholderTextColor="#9ca3af"
                        />
                      ) : (
                        <Text style={styles.fieldValue}>
                          {profileData[field.key as keyof typeof profileData]}
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </View>

          {/* Action Buttons */}
          {isEditing && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.saveGradient}
                >
                  <Save size={20} color="#ffffff" />
                  <Text style={styles.saveText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7c3aed',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  premiumText: {
    color: '#ffd700',
    marginLeft: 5,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  statsGradient: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  statLabel: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 5,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#374151',
    marginHorizontal: 10,
  },
  fieldsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fieldGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  fieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  fieldInput: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#8b5cf6',
    paddingVertical: 5,
  },
  actionButtons: {
    marginBottom: 30,
  },
  saveButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  cancelText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});