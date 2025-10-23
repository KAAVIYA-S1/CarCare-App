import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SUPPORT_OPTIONS = [
  {
    id: 'call',
    title: 'Call Us',
    description: 'Speak with our customer support',
    icon: 'phone',
    action: () => Linking.openURL('tel:+919444455555')
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: 'Chat with us on WhatsApp',
    icon: 'chat',
    action: () => Linking.openURL('https://wa.me/919444455555')
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'Send us an email',
    icon: 'email',
    action: () => Linking.openURL('mailto:support@carcare.com')
  }
];

const FAQ_ITEMS = [
  {
    question: 'What services do you offer?',
    answer: 'We offer comprehensive car care services including exterior/interior cleaning, premium detailing, ceramic coating, paint protection, and mechanical services.'
  },
  {
    question: 'How long does a car service take?',
    answer: 'Basic services take 30-45 minutes, while detailed services may take 2-3 hours depending on the package and vehicle condition.'
  },
  {
    question: 'Do I need to book in advance?',
    answer: 'We recommend booking in advance to ensure availability. However, we do accept walk-ins subject to slot availability.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI payments, and cash. Digital payments are preferred.'
  },
  {
    question: 'Is service warranty available?',
    answer: 'Yes, we provide warranty for specific services like ceramic coating and paint protection. Duration varies by service.'
  }
];

export default function SupportScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Quick Support Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <Text style={styles.sectionSubtitle}>Choose your preferred way to reach us</Text>
        
        <View style={styles.supportGrid}>
          {SUPPORT_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.supportCard}
              onPress={option.action}
            >
              <View style={styles.iconContainer}>
                <Icon name={option.icon} size={24} color="#06b6d4" />
              </View>
              <Text style={styles.supportTitle}>{option.title}</Text>
              <Text style={styles.supportDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Support Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support Hours</Text>
        <View style={styles.hoursCard}>
          <View style={styles.hourRow}>
            <Icon name="access-time" size={20} color="#06b6d4" />
            <View style={styles.hourContent}>
              <Text style={styles.dayText}>Monday - Saturday</Text>
              <Text style={styles.timeText}>9:00 AM - 8:00 PM</Text>
            </View>
          </View>
          <View style={styles.hourRow}>
            <Icon name="access-time" size={20} color="#06b6d4" />
            <View style={styles.hourContent}>
              <Text style={styles.dayText}>Sunday</Text>
              <Text style={styles.timeText}>10:00 AM - 6:00 PM</Text>
            </View>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        {FAQ_ITEMS.map((item, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </View>

      {/* Emergency Support */}
      <View style={[styles.section, styles.emergencySection]}>
        <Text style={styles.emergencyTitle}>Emergency Support</Text>
        <Text style={styles.emergencyText}>
          For urgent assistance outside business hours
        </Text>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => Linking.openURL('tel:+919444455555')}
        >
          <Icon name="phone" size={20} color="#fff" />
          <Text style={styles.emergencyButtonText}>Call Emergency Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  section: {
    padding: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between'
  },
  supportCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center'
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
    textAlign: 'center'
  },
  supportDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center'
  },
  hoursCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    gap: 16
  },
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hourContent: {
    marginLeft: 12
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8
  },
  answer: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20
  },
  emergencySection: {
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center'
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4
  },
  emergencyText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16
  },
  emergencyButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
