import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import { MaterialIcons } from '@expo/vector-icons';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { fontSizes } from '../../components/foundations/tokens';
import { FileInput } from '../../components/inputs/FileInput';
import TextArea from '../../components/inputs/TextArea';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
import { BodyText, Heading } from '../../components/typography';

interface Ticket {
  id: string;
  description: string;
  status: 'Created' | 'InProgress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  estimatedResolution: string | null; // ISO date or null
  attachments: { uri: string; name: string }[];
}

const faqs = [
  {
    question: 'What is the purpose of this app?',
    answer: 'This app is designed to help users understand their business astrology and make informed decisions.'
  },
  {
    question: 'How do I create a report?',
    answer: 'To create a report, simply select the type of report you want to create and follow the instructions.'
  },
  {
    question: 'What is the refund policy?',
    answer: 'We do not offer refunds for any of our products.'
  }
];

const HelpSupportScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  // Fetch user's tickets on mount
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // const response = await api.get('/users/me/tickets');
      // setTickets(response.data);
    } catch (error) {
      setToastMessage('Failed to fetch tickets');
      setToastType('error');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };



  const handleSubmitIssue = async () => {
    if (!issueDescription.trim()) {
      setToastMessage('Please describe the issue');
      setToastType('error');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('description', issueDescription);
      
      // Handle files from FileInput component
      attachedFiles.forEach((file: any) => {
        formData.append('attachments', {
          uri: file.uri,
          name: file.name,
          type: file.type || 'application/octet-stream',
        } as any);
      });

      // const response = await api.post('/tickets', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      setToastMessage(`Ticket #${'123'} created successfully`);
      setToastType('success');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setIssueDescription('');
      setAttachedFiles([]);
      fetchTickets(); // Refresh ticket list
    } catch (error) {
      setToastMessage('Failed to submit ticket');
      setToastType('error');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleMarkAsRead = async (ticketId: string) => {
    try {
      // await api.patch(`/users/me/tickets/${ticketId}`, { status: 'read' });
      fetchTickets();
    } catch (error) {
      setToastMessage('Failed to update ticket');
      setToastType('error');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 18, fontWeight: '600', color: colors.brand.primary }}>Help & Support</Text>}
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <View style={styles.backButton}>
                <ArrowLeft size={20} color={colors.neutral.medium} />
              </View>
            ),
            onPress: () => setSelectedTicket(null), // Reset on back
            accessibilityLabel: 'Back',
          }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20, gap: 20 }} showsVerticalScrollIndicator={false}>
          {selectedTicket ? (
            // Ticket Detail View
            <AnimatedCard style={[glassCardStyle, { margin: 0, marginBottom: 0 ,borderRadius: 21}]}>
                             <Heading level="h4" style={{ ...styles.sectionTitle, color: colors.brand.primary }}>
                 Ticket #{selectedTicket.id}
               </Heading>
              <BodyText style={styles.sectionText}>Status: {selectedTicket.status}</BodyText>
              <BodyText style={styles.sectionText}>
                Created: {new Date(selectedTicket.createdAt).toLocaleString()}
              </BodyText>
              {selectedTicket.estimatedResolution && (
                <BodyText style={styles.sectionText}>
                  Estimated Resolution: {new Date(selectedTicket.estimatedResolution).toLocaleString()}
                </BodyText>
              )}
              <BodyText style={styles.sectionText}>Description: {selectedTicket.description}</BodyText>
                             {selectedTicket.attachments.length > 0 && (
                 <View style={{ marginBottom: 12 }}>
                   <Heading level="h5" style={styles.sectionTitle}>Attachments</Heading>
                   {selectedTicket.attachments.map((file, index) => (
                     <TouchableOpacity key={index} onPress={() => Linking.openURL(file.uri)}>
                       <View style={{
                         flexDirection: 'row',
                         alignItems: 'center',
                         borderRadius: 21,
                         padding: 8,
                         marginBottom: 8,
                       }}>
                         <MaterialIcons name="insert-drive-file" size={20} color={colors.brand.accent} />
                         <BodyText style={{
                           color: '#fff',
                           flex: 1,
                           marginHorizontal: 8,
                           fontSize: fontSizes.body.size,
                         }}>{file.name}</BodyText>
                       </View>
                     </TouchableOpacity>
                   ))}
                 </View>
               )}
                             {selectedTicket.status === 'Resolved' && (
                 <BodyText style={{ ...styles.sectionText, color: colors.brand.primary }}>Issue Resolved Successfully!</BodyText>
               )}
              {selectedTicket.status !== 'Resolved' && selectedTicket.status !== 'Closed' && (
                                 <ButtonPrimary
                   onPress={() => handleMarkAsRead(selectedTicket.id)}
                   config={{ size: 'small' }}
                   style={{ minWidth: 100 }}
                 >
                   Mark as Read
                 </ButtonPrimary>
              )}
            </AnimatedCard>
          ) : (
            <>
              {/* Ticket Creation Section */}
              <AnimatedCard style={[glassCardStyle,styles.card]}>
                                 <Heading level="h4" style={{ ...styles.sectionTitle, color: colors.brand.primary }}>
                   Raise a Support Ticket
                 </Heading>
                 <BodyText style={{ ...styles.sectionText, color: colors.neutral.light }}>
                   Describe your issue and attach screenshots if needed. Our team will respond promptly.
                 </BodyText>
                                 <TextArea
                   value={issueDescription}
                   onChangeText={setIssueDescription}
                   placeholder="Describe your issue here..."
                   size="medium"
                   variant="outlined"
                   label={{
                     text: "Issue Description",
                     position: "top"
                   }}
                   validation={{
                     required: true,
                     minLength: 10,
                     showCharacterCount: true
                   }}
                   autoResize={{
                     enabled: true,
                     minHeight: 120,
                     maxHeight: 300
                   }}
                   inputStyle={{ color: '#FFFFFF' }}
                   style={{ marginBottom: 16 }}
                 />
                 
                 <FileInput
                   value={attachedFiles}
                   onFilesChange={setAttachedFiles}
                   placeholder="Attach files"
                   label="Attachments"
                   variant="dropzone"
                   size="medium"
                   multiple={true}
                   fileType="document"
                   showPreview={true}
                   showProgress={true}
                   validationRules={{
                     maxSize: 10 * 1024 * 1024, // 10MB
                     allowedTypes: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
                     maxFiles: 5
                   }}
                   uploadButtonText="Upload"
                   browseButtonText="Browse Files"
                   dropZoneText="Drop files here or click to browse"
                   style={{ marginBottom: 16 }}
                 />
                                 <ButtonPrimary
                   onPress={handleSubmitIssue}
                   disabled={!issueDescription.trim() || loading}
                   config={{ size: 'small' }}
                   style={{ width: '100%', marginTop: 8 }}
                 >
                   Submit Ticket
                 </ButtonPrimary>
              </AnimatedCard>
              {/* Ticket List Section */}
              <AnimatedCard style={[glassCardStyle,styles.card]}>
                                 <Heading level="h4" style={{ ...styles.sectionTitle, color: colors.brand.primary }}>
                   Your Tickets
                 </Heading>
                {tickets.length === 0 ? (
                  <BodyText style={styles.sectionText}>No tickets found.</BodyText>
                ) : (
                  tickets.map((ticket) => (
                    <TouchableOpacity key={ticket.id} onPress={() => handleViewTicket(ticket)} style={styles.ticketItem}>
                      <BodyText style={styles.ticketText}>Ticket #{ticket.id}</BodyText>
                      <BodyText style={styles.ticketStatus}>{ticket.status}</BodyText>
                      <MaterialIcons name="chevron-right" size={20} color={colors.brand.accent} />
                    </TouchableOpacity>
                  ))
                )}
              </AnimatedCard>
              {/* FAQ Section */}
              <AnimatedCard style={[glassCardStyle,styles.card]}>
                                 <Heading level="h4" style={{ ...styles.sectionTitle, color: colors.brand.primary }}>
                   Frequently Asked Questions
                 </Heading>
                {faqs.map((faq, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.faqItem}
                    onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <View style={styles.faqHeader}>
                      <BodyText style={styles.faqQuestion}>{faq.question}</BodyText>
                      <MaterialIcons
                        name={expandedFAQ === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={24}
                        color={colors.brand.accent}
                      />
                    </View>
                    {expandedFAQ === index && (
                      <BodyText style={styles.faqAnswer}>{faq.answer}</BodyText>
                    )}
                  </TouchableOpacity>
                ))}
              </AnimatedCard>
              {/* Contact Support Section */}
              <AnimatedCard style={[glassCardStyle,styles.card]   }>
                                 <Heading level="h4" style={{ ...styles.sectionTitle, color: colors.brand.primary }}>
                   Contact Support
                 </Heading>
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => Linking.openURL('mailto:support@corpastro.com')}
                >
                  <MaterialIcons name="mail-outline" size={24} color={colors.brand.accent} />
                  <BodyText style={styles.contactText}>support@corpastro.com</BodyText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => Linking.openURL('tel:+919876543210')}
                >
                  <MaterialIcons name="phone-in-talk" size={24} color={colors.brand.accent} />
                  <BodyText style={styles.contactText}>+91 9876543210</BodyText>
                </TouchableOpacity>
              </AnimatedCard>
            </>
          )}
        </ScrollView>
        {toastVisible && (
          <View style={{
            position: 'absolute',
            top: 100,
            left: 20,
            right: 20,
            backgroundColor: toastType === 'success' ? '#10B981' : '#EF4444',
            padding: 16,
            borderRadius: 8,
            zIndex: 1000,
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {toastMessage}
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              onPress={() => setToastVisible(false)}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    marginLeft: -15,
  },
  card: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 21,
    padding: 16,
  },
  sectionTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: fontSizes.body.size,
    lineHeight: fontSizes.body.size * 1.5,
    textAlign: 'center',
    marginBottom: 12,
    color: '#fff',
  },

  ticketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 21,
    marginBottom: 8,
  },
  ticketText: {
    color: '#fff',
    fontSize: fontSizes.body.size,
    flex: 1,
  },
  ticketStatus: {
    color: '#E1B725',
    fontSize: fontSizes.body.size,
    marginRight: 8,
  },
  faqItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 21,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    color: '#fff',
    fontSize: fontSizes.body.size,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    color: '#fff',
    fontSize: fontSizes.body.size,
    marginTop: 8,
    lineHeight: fontSizes.body.size * 1.5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
      borderRadius: 21,
  },
  contactText: {
    color: '#fff',
    marginLeft: 12,
    fontSize: fontSizes.body.size,
    fontWeight: '600',
  },
});

export default HelpSupportScreen;
