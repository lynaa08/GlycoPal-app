import { useTheme } from '@/context/ThemeContext';
import { PixelifySans_400Regular, PixelifySans_700Bold, useFonts } from '@expo-google-fonts/pixelify-sans';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const dailyData = [
  { date: '09/02', status: 'Great Efforts', message: 'Celebrate when you do well 😊', average: '137 mg/dl.', bg: '#FFFFFF' },
  { date: '10/02', status: 'Almost There', message: 'Your message was strong, but not too long 😍😍😍', average: '165 mg/dl.', bg: '#FFFFFF' },
  { date: '11/02', status: 'Looks Good', message: 'Thanks for sharing your thoughts 😊', average: '154 mg/dl.', bg: '#FFFFFF' },
  { date: '12/02', status: 'Great Efforts', message: 'Excellent! You &apos; re working on the great things! 😊', average: '213 mg/dl.', bg: '#FFFFFF' },
  { date: '13/02', status: 'Good', message: 'Great job as a team to bring our best game in going 😊', average: '125 mg/dl.', bg: '#FFFFFF' },
  { date: '14/02', status: 'Amazing', message: 'Thanks for always trying to help out and make it great! 😊', average: '95 mg/dl.', bg: '#FFFFFF' },
  { date: '15/02', status: 'Excellent', message: 'Fantastic run on 🏅', average: '85 mg/dl.', bg: '#FFFFFF' },
  { date: '16/02', status: 'Great Efforts', message: 'Celebrate when you do well 😊', average: '113 mg/dl.', bg: '#FFFFFF' },
  { date: '17/02', status: 'Almost There', message: 'Your message was strong, but not too long 😍😍😍', average: '125 mg/dl.', bg: '#FFFFFF' },
  { date: '18/02', status: 'Looks Good', message: 'Thanks for sharing your thoughts 😊', average: '153 mg/dl.', bg: '#FFFFFF' },
  { date: '19/02', status: 'Great Efforts', message: 'Excellent! You &apos; re working on the great things! 😊', average: '168 mg/dl.', bg: '#FFFFFF' },
  { date: '20/02', status: 'Good', message: 'Great job as a team to bring our best game in going 😊', average: '93 mg/dl.', bg: '#FFFFFF' },
  { date: '21/02', status: 'Amazing', message: 'Thanks for always trying to help out and make it great! 😊', average: '178 mg/dl.', bg: '#FFFFFF' },
];

export default function AgendaScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [selectedRange, setSelectedRange] = useState('90 days');
  const [showDropdown, setShowDropdown] = useState(false);

  const ranges = ['15 days', '30 days', '60 days', '90 days'];

  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER AVEC ICÔNE SETTINGS */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.subtitle, { color: colors.textPrimary }]}>Daily Behaviour</Text>
        </View>
        {/* BOUTON THEME TOGGLE */}
        <TouchableOpacity style={[styles.themeButton, { backgroundColor: colors.secondary }]} onPress={toggleTheme}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* LIGNE HORIZONTALE */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Date Range Dropdown */}
      <View style={{ zIndex: 2000, alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity
          style={[styles.dropdownButton, { backgroundColor: colors.card, borderColor: colors.border, alignSelf: 'center' }]}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={[styles.dropdownButtonText, { color: colors.textSecondary }]}>Last {selectedRange}</Text>
          <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        {showDropdown && (
          <View style={[styles.dropdownList, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {ranges.map((range) => (
              <TouchableOpacity
                key={range}
                style={[styles.dropdownItem, { borderBottomColor: colors.border }]}
                onPress={() => {
                  setSelectedRange(range);
                  setShowDropdown(false);
                }}
              >
                <Text style={[styles.dropdownItemText, { color: colors.textSecondary }]}>{range}</Text>
                {selectedRange === range && <Ionicons name="checkmark" size={16} color={colors.accent} />}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* STICKY HEADER */}
      <View style={[styles.tableHeader, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <Text style={[styles.headerText, styles.headerDate]}>Date</Text>
        <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.headerText, styles.headerStatus]}>Status</Text>
        <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.headerText, styles.headerNotify]}>Notes</Text>
        <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.headerText, styles.headerAvg]}>Average</Text>
      </View>

      <ScrollView
        style={{ flex: 1, zIndex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* TABLE BODY */}
        <View style={[styles.tableBody, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {dailyData.map((row, index) => (
            <View key={index} style={[styles.tableRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cell, styles.cellDate, { color: colors.textSecondary }]}>{row.date}</Text>
              <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.cell, styles.cellStatus, { color: colors.textSecondary }]}>{row.status}</Text>
              <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.cell, styles.cellNotify, { color: colors.textSecondary }]}>
                {row.message}
              </Text>
              <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.cell, styles.cellAvg, { color: colors.textSecondary }]}>{row.average}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  divider: {
    alignSelf: 'center',
    width: 220,
    height: 1.5,
    marginTop: 2,
    borderRadius: 2,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'PixelifySans_700Bold',
  },
  themeButton: {
    position: 'absolute',
    right: 16,
    padding: 12,
    borderRadius: 50,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dropdownButtonText: {
    fontFamily: 'PixelifySans_400Regular',
    fontSize: 14,
    marginRight: 8,
  },
  dropdownList: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16, // Or fixed width
    zIndex: 1000,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontFamily: 'PixelifySans_400Regular',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  headerText: {
    fontFamily: 'PixelifySans_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  verticalLine: {
    width: 1,
    alignSelf: 'stretch',
    marginHorizontal: 4,
  },
  headerDate: {
    width: 65,
  },
  headerStatus: {
    width: 85,
  },
  headerNotify: {
    flex: 1,
  },
  headerAvg: {
    width: 80,
    textAlign: 'center',
  },
  tableBody: {
    marginHorizontal: 16,
    borderWidth: 1,
    overflow: 'hidden',
    borderTopWidth: 0, // Removed top border since header has it? Or header has bottom:0
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  cell: {
    fontFamily: 'PixelifySans_400Regular',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
  },
  cellDate: {
    width: 65,
  },
  cellStatus: {
    width: 85,
    fontFamily: 'PixelifySans_700Bold',
  },
  cellNotify: {
    flex: 1,
    marginRight: 4,
  },
  cellAvg: {
    width: 80,
    textAlign: 'center',
  },
});