import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"; // Utilisation de la bibliothèque moment.js pour les dates

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [timeFilter, setTimeFilter] = useState("today"); // Filtre de temps (today, week, month)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Erreur chargement notes:", error);
    }
  };

  const filterByTime = (note) => {
    const noteDate = moment(note.date); // Moment.js pour gérer les dates
    const now = moment();
    
    if (timeFilter === "today") {
      return noteDate.isSame(now, "day"); // Vérifie si la note est du jour
    }
    if (timeFilter === "week") {
      return noteDate.isSame(now, "week"); // Vérifie si la note est de cette semaine
    }
    if (timeFilter === "month") {
      return noteDate.isSame(now, "month"); // Vérifie si la note est de ce mois
    }
    return true; // Aucune filtration par défaut
  };

  const filteredNotes = notes.filter((note) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && note.completed) ||
      (filter === "pending" && !note.completed) ||
      (filter === "notes" && note.category === "note") ||
      (filter === "tasks" && note.category === "tâche");

    const matchesSearch =
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesTime = filterByTime(note);

    return matchesFilter && matchesSearch && matchesTime;
  });

  const FilterButton = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === value && styles.filterButtonActive,
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const TimeFilterButton = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        timeFilter === value && styles.filterButtonActive,
      ]}
      onPress={() => setTimeFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          timeFilter === value && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate("NoteDetail", { note: item })}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.categoryIcon}>
          {item.category === "note" ? "📝" : "✓"}
        </Text>
        <View style={styles.noteContent}>
          <Text
            style={[styles.noteTitle, item.completed && styles.completedText]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.noteDescription,
              item.completed && styles.completedText,
            ]}
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.noteMetadata}>
          <Text style={styles.noteDate}>{item.date}</Text>
          {item.location && <Text style={styles.noteIcon}>📍</Text>}
          {item.photo && <Text style={styles.noteIcon}>📷</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <FilterButton title="Tout" value="all" />
        <FilterButton title="Notes" value="notes" />
        <FilterButton title="Tâches" value="tasks" />
        <FilterButton title="Terminé" value="completed" />
        <FilterButton title="En cours" value="pending" />
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <TimeFilterButton title="Aujourd'hui" value="today" />
        <TimeFilterButton title="Cette semaine" value="week" />
        <TimeFilterButton title="Ce mois" value="month" />
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddNote")}
      >
        <Text style={styles.addButtonText}>+ Nouvelle Note</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
    height: 40, // Augmenter la hauteur pour les boutons de filtre
  },
  filterButton: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#4CAF50",
  },
  filterButtonText: {
    color: "black",
  },
  filterButtonTextActive: {
    color: "white",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  noteItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noteDescription: {
    fontSize: 14,
    color: "#666",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  noteMetadata: {
    alignItems: "flex-end",
  },
  noteDate: {
    fontSize: 12,
    color: "#666",
  },
  noteIcon: {
    fontSize: 12,
    marginTop: 4,
  },
});
