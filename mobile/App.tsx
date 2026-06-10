import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';

type ScreenTab = 'Home' | 'Calculators' | 'Saved' | 'Insights' | 'Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('Home');
  const [selectedCalculator, setSelectedCalculator] = useState<string>('EMI');

  const calculatorsList = ['EMI', 'SIP', 'Loan Eligibility', 'Salary Tax', 'Rewards', 'Construction', 'Tiles'];

  // Safe Area Screen Wrapper
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#030712" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧭 CalcPilot</Text>
        <Text style={styles.headerSubtitle}>{activeTab}</Text>
      </View>

      {/* Screen Body */}
      <ScrollView contentContainerStyle={styles.body}>
        {activeTab === 'Home' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Featured Calculators</Text>
            <Text style={styles.cardText}>Select a tool below or use the bottom navigation.</Text>
            
            <View style={styles.grid}>
              {calculatorsList.slice(0, 4).map((calc) => (
                <TouchableOpacity
                  key={calc}
                  style={styles.gridBtn}
                  onPress={() => {
                    setSelectedCalculator(calc);
                    setActiveTab('Calculators');
                  }}
                >
                  <Text style={styles.btnEmoji}>📊</Text>
                  <Text style={styles.btnLabel}>{calc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'Calculators' && (
          <View style={styles.calculatorShell}>
            {/* Horizontal Sub-Selector */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSelector}>
              {calculatorsList.map((calc) => (
                <TouchableOpacity
                  key={calc}
                  style={[styles.subTab, selectedCalculator === calc && styles.subTabActive]}
                  onPress={() => setSelectedCalculator(calc)}
                >
                  <Text style={[styles.subTabText, selectedCalculator === calc && styles.subTabTextActive]}>
                    {calc}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.calcBody}>
              <Text style={styles.calcTitle}>{selectedCalculator} Estimator</Text>
              <Text style={styles.cardText}>Interactive sliders &amp; charts are rendered native here.</Text>
              
              {/* Display mock input parameters */}
              <View style={styles.mockInput}>
                <Text style={styles.mockLabel}>Adjust parameters via touch inputs.</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Saved' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Saved Logs</Text>
            <Text style={styles.cardText}>No saved calculations found. Try running a calculator and clicking Save.</Text>
          </View>
        )}

        {activeTab === 'Insights' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Financial Advisory</Text>
            <Text style={styles.cardText}>Run calculations to receive custom strategies on prepayment and tax harvesting.</Text>
          </View>
        )}

        {activeTab === 'Profile' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>My Profile</Text>
            <Text style={styles.cardText}>Name: Guest User</Text>
            <Text style={styles.cardText}>Preferred Currency: INR (₹)</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tabs Navigation */}
      <View style={styles.tabBar}>
        {(['Home', 'Calculators', 'Saved', 'Insights', 'Profile'] as ScreenTab[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity key={tab} style={styles.tabItem} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab === 'Home' && '🏠'}
                {tab === 'Calculators' && '🧮'}
                {tab === 'Saved' && '🔖'}
                {tab === 'Insights' && '📈'}
                {tab === 'Profile' && '👤'}
              </Text>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  header: {
    height: 60,
    backgroundColor: '#0b0f19',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  body: {
    padding: 20,
  },
  card: {
    backgroundColor: '#0b0f19',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#f3f4f6',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    color: '#9ca3af',
    fontSize: 13,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  gridBtn: {
    width: '48%',
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1e293b',
    alignItems: 'center',
  },
  btnEmoji: {
    fontSize: 22,
  },
  btnLabel: {
    color: '#f3f4f6',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  calculatorShell: {
    flex: 1,
  },
  horizontalSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  subTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#111827',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  subTabActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  subTabText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: 'bold',
  },
  subTabTextActive: {
    color: '#030712',
  },
  calcBody: {
    backgroundColor: '#0b0f19',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  calcTitle: {
    color: '#f3f4f6',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mockInput: {
    marginTop: 20,
    backgroundColor: '#111827',
    padding: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  mockLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#0b0f19',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 18,
  },
  tabLabelActive: {
    opacity: 1,
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#38bdf8',
  },
});
