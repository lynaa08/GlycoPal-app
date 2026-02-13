import colors from '@/constants/colors-light';
import { PixelifySans_400Regular, PixelifySans_700Bold, useFonts } from '@expo-google-fonts/pixelify-sans';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dailyData = [
{ date: '09/02', status: 'Great Effe', message: 'Celebrate when you do well 😊', average: '8/1 avg.', bg: '#FFFFFF' },
{ date: '10/02', status: 'Almost There', message: 'Your message was strong, but not too long 😍😍😍', average: '9/1 avg.', bg: '#FFFFFF' },
{ date: '11/02', status: 'Looks Good', message: 'Thanks for sharing your thoughts 😊', average: '4/1 avg.', bg: '#FFFFFF' },
{ date: '12/02', status: 'Great Effe', message: 'Excellent! You’re working on the great things! 😊', average: '9/1 avg.', bg: '#FFFFFF' },
{ date: '13/02', status: 'Good', message: 'Great job as a team to bring our best game in going 😊', average: '6/1 avg.', bg: '#FFFFFF' },
{ date: '14/02', status: 'Amazing', message: 'Thanks for always trying to help out and make it great! 😊', average: '5/1 avg.', bg: '#FFFFFF' },
{ date: '15/02', status: 'Excellent', message: 'Fantastic run on 🏅', average: '-', bg: '#FFFFFF' },
];

export default function AgendaScreen() {
const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_700Bold,
});

if (!fontsLoaded) {
    return null;
}

return (
    <View style={styles.container}>
      {/* HEADER AVEC ICÔNE SETTINGS */}
    <View style={styles.header}>
        <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>Daily Behaviour</Text>
        </View>
        {/* 🔥 BOUTON SETTINGS AJOUTÉ ICI */}
        <TouchableOpacity style={styles.settingsBtn}>
        <Ionicons name="sunny" size={22} color="white" />
        </TouchableOpacity>
    </View>
          {/* 🔵 LIGNE HORIZONTALE AJOUTÉE ICI */}
    <View style={styles.divider} />

      {/* TABLE HEADER - PREMIÈRE LIGNE COLORÉE */}
    <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.headerDate]}>Date</Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.headerText, styles.headerStatus]}>Status</Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.headerText, styles.headerNotify]}>Notes</Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.headerText, styles.headerAvg]}>Average</Text>
    </View>

      {/* TABLE BODY */}
    <View style={styles.tableBody}>
        {dailyData.map((row, index) => (
        <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, styles.cellDate]}>{row.date}</Text>
            <View style={styles.verticalLine} />
            <Text style={[styles.cell, styles.cellStatus]}>{row.status}</Text>
            <View style={styles.verticalLine} />
            <Text style={[styles.cell, styles.cellNotify]} numberOfLines={1}>
            {row.message}
            </Text>
            <View style={styles.verticalLine} />
            <Text style={[styles.cell, styles.cellAvg]}>{row.average}</Text>
        </View>
        ))}
    </View>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#04031D',
    paddingTop: 40,
},
header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
},
divider: {
alignSelf: 'center',
width: 220,
height:1.5,
backgroundColor: '#D8D8D8',
marginTop: 2,
borderRadius: 2,
marginBottom: 20,
},

    titleContainer: {  // ← AJOUTE CECI
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},
subtitle: {
    fontSize: 20,
    fontFamily: 'PixelifySans_700Bold',
    color: '#D8D8D8',
},
settingsBtn: {
    position: 'absolute',
    right: 16,
    backgroundColor: "#1A1E4A",
    padding: 12,
    borderRadius: 50,
},
tableHeader: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    backgroundColor: '#16477E', // BLEU VIOLET EXACT
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    borderBottomWidth: 0,
},
headerText: {
    fontFamily: 'PixelifySans_700Bold',
    fontSize: 14,
    color: '#FFFFFF', // BLANC
},
verticalLine: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
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
    backgroundColor: '#321A3B',
    borderWidth: 1,
    overflow: 'hidden',

},
tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: '#321A3B',
},
cell: {
    fontFamily: 'PixelifySans_400Regular',
    fontSize: 13,
    color: '#D8D8D8',
},
cellDate: {
    width: 65,
},
cellStatus: {
    width: 85,
    fontFamily: 'PixelifySans_700Bold',
    color: '#D8D8D8',
},
cellNotify: {
    flex: 1,
    marginRight: 4,
    color: '#D8D8D8',
},
cellAvg: {
    width: 80,
    textAlign: 'center',
    color: '#D8D8D8',
},
cellVerticalLine: {
 width: 1, // ← ÉPAISSEUR LIGNE VERTICALE
height: '100%',
  backgroundColor: '#321A3B', // ← COULEUR LIGNE VERTICALE
marginHorizontal: 8,
},
});