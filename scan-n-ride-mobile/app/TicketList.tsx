import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import moment from 'moment';

// Define the TicketTypeEnum
enum TicketTypeEnum {
  Single = 'Single',
  Time_20_Minutes = 'Time_20_Minutes',
  Time_60_Minutes = 'Time_60_Minutes',
  Time_6_Hours = 'Time_6_Hours',
  Time_24_Hours = 'Time_24_Hours'
}

interface TicketResponse {
  uuid: string;
  createdAt: string;
  validUntil: string;
  line: string;
  vehicleNumber: string;
  type: TicketTypeEnum;
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Here we use static data instead of an API call
        const sampleData: TicketResponse[] = [
          {
            uuid: '1',
            createdAt: '2024-06-01T08:00:00',
            validUntil: '2024-06-08T08:20:00',
            line: 'Linia A',
            vehicleNumber: '1234',
            type: TicketTypeEnum.Time_20_Minutes,
          },
          {
            uuid: '2',
            createdAt: '2024-06-01T10:00:00',
            validUntil: '2024-06-01T11:00:00',
            line: 'Linia B',
            vehicleNumber: '5678',
            type: TicketTypeEnum.Time_60_Minutes,
          },
          {
            uuid: '3',
            createdAt: '2024-06-01T12:00:00',
            validUntil: '2024-06-01T18:00:00',
            line: 'Linia C',
            vehicleNumber: '9101',
            type: TicketTypeEnum.Time_6_Hours,
          },
        ];
        

        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setTickets(sampleData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTimeRemaining = (validUntil: string) => {
    const now = moment();
    const validUntilMoment = moment(validUntil);
    const duration = moment.duration(validUntilMoment.diff(now));

    if (duration.asMilliseconds() <= 0) {
      return 'Ważność upłynęła';
    } else {
      const hours = duration.hours();
      const minutes = duration.minutes();
      return `${hours} godziny ${minutes} minuty`;
    }
  };

  const getTicketTypeLabel = (type: TicketTypeEnum) => {
    switch (type) {
      case TicketTypeEnum.Time_20_Minutes:
        return '20-minutowy';
      case TicketTypeEnum.Time_60_Minutes:
        return '60-minutowy';
      case TicketTypeEnum.Time_6_Hours:
        return '6-godzinny';
      case TicketTypeEnum.Time_24_Hours:
        return '24-godzinny';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={item => item.uuid}
        renderItem={({ item }) => {
          const isExpired = getTimeRemaining(item.validUntil) === 'Ważność upłynęła';
          return (
            <View style={[styles.ticketContainer]}>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>UUID:</Text>
                <Text style={styles.value}>{item.uuid}</Text>
                <Text style={styles.label}>Data utworzenia:</Text>
                <Text style={styles.value}>{item.createdAt}</Text>
                <Text style={styles.label}>Ważny do:</Text>
                <Text style={[styles.value, isExpired ? styles.invalidText : null]}>{item.validUntil}</Text>
                <Text style={styles.label}>Linia:</Text>
                <Text style={styles.value}>{item.line}</Text>
                <Text style={styles.label}>Numer pojazdu:</Text>
                <Text style={styles.value}>{item.vehicleNumber}</Text>
              </View>
              <View style={[styles.ticketVisual, isExpired ? styles.expiredTicketBackground : null]}>
                <Text style={styles.labelDark}>Typ biletu:</Text>
                <Text style={styles.ticketVisualText}>{getTicketTypeLabel(item.type)}</Text>
                <Text style={styles.labelDark}>Pozostały czas:</Text>
                <Text style={[styles.ticketVisualText, isExpired ? styles.invalidLabelText : null]}>{getTimeRemaining(item.validUntil)}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  ticketContainer: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  expiredTicket: {
    backgroundColor: '#d3d3d3',
  },
  infoContainer: {
    flex: 2,
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  labelDark: {
    fontSize: 14,
    color: '#f9f9f9',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ticketVisual: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
  },
  expiredTicketBackground: {
    backgroundColor: '#d3d3d3',
  },
  ticketVisualText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  invalidText: {
    color: 'red',
  },
  invalidLabelText: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default TicketList;
