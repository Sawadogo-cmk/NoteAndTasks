import React, { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"; // Utilisation de la bibliothèque moment.js pour les dates
=======
=======
>>>>>>> feature/map-location
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
<<<<<<< HEAD
>>>>>>> feature/filter-tasks
=======
import MapView, { Marker } from "react-native-maps";
>>>>>>> feature/map-location

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all", "notes", "tasks", "completed", "pending"
  const [searchText, setSearchText] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD
  const [timeFilter, setTimeFilter] = useState("today"); // Filtre de temps (today, week, month)
=======
  const [timeFilter, setTimeFilter] = useState("all"); // "all", "today", "week", "month"
>>>>>>> feature/filter-tasks
=======
  const [timeFilter, setTimeFilter] = useState("all"); // "all", "today", "week", "month"
>>>>>>> feature/map-location

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
      console.error("Erreur lors du chargement des notes:", error);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> feature/map-location
  // Fonction de filtrage par période
  const matchesTimeFilter = (note) => {
    if (timeFilter === "all") return true;
    // Si nécessaire, précisez le format, par exemple "DD/MM/YYYY"
    const noteDate = moment(note.date);
    const now = moment();
    if (timeFilter === "today") return noteDate.isSame(now, "day");
    if (timeFilter === "week") return noteDate.isSame(now, "week");
    if (timeFilter === "month") return noteDate.isSame(now, "month");
    return true;
  };
<<<<<<< HEAD
>>>>>>> feature/filter-tasks
=======
>>>>>>> feature/map-location

  // Filtrage par catégorie
  const matchesCategoryFilter = (note) => {
    if (categoryFilter === "all") return true;
    if (categoryFilter === "notes") return note.category === "note";
    if (categoryFilter === "tasks") return note.category === "tâche";
    if (categoryFilter === "completed") return note.completed === true;
    if (categoryFilter === "pending") return note.completed === false;
    return true;
  };

<<<<<<< HEAD
<<<<<<< HEAD
    const matchesTime = filterByTime(note);

    return matchesFilter && matchesSearch && matchesTime;
  });
=======
=======
>>>>>>> feature/map-location
  // Filtrage par recherche textuelle
  const matchesSearchFilter = (note) => {
    if (!searchText) return true;
    const lowerSearch = searchText.toLowerCase();
    return (
      (note.title && note.title.toLowerCase().includes(lowerSearch)) ||
      (note.description && note.description.toLowerCase().includes(lowerSearch))
    );
  };
<<<<<<< HEAD
>>>>>>> feature/filter-tasks
=======
>>>>>>> feature/map-location

  // Combinaison des filtres
  const filteredNotes = notes.filter(
    (note) =>
      matchesCategoryFilter(note) &&
      matchesSearchFilter(note) &&
      matchesTimeFilter(note)
  );

  // Bouton de filtre de catégorie
  const FilterButton = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        categoryFilter === value && styles.filterButtonActive,
      ]}
      onPress={() => setCategoryFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          categoryFilter === value && styles.filterButtonTextActive,
<<<<<<< HEAD
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

<<<<<<< HEAD
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
=======
>>>>>>> feature/map-location
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

<<<<<<< HEAD
  const renderItem = ({ item }) => (
=======
=======
>>>>>>> feature/map-location
  // Sélecteur de période
  const TimeFilterPicker = () => (
    <View style={styles.timeFilterContainer}>
      <Text style={styles.filterLabel}>Filtrer par période :</Text>
      <Picker
        selectedValue={timeFilter}
        style={styles.picker}
        onValueChange={(value) => setTimeFilter(value)}
      >
        <Picker.Item label="Toutes" value="all" />
        <Picker.Item label="Aujourd'hui" value="today" />
        <Picker.Item label="Cette semaine" value="week" />
        <Picker.Item label="Ce mois-ci" value="month" />
      </Picker>
    </View>
  );

  // Rendu d'une note/tâche
  const renderNoteItem = ({ item }) => (
<<<<<<< HEAD
>>>>>>> feature/filter-tasks
=======
>>>>>>> feature/map-location
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate("NoteDetail", { note: item })}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.categoryIcon}>
          {item.category === "note" ? "📝" : "✓"}
        </Text>
        <View style={styles.noteContent}>
          <Text style={[styles.noteTitle, item.completed && styles.completedText]}>
            {item.title}
          </Text>
          <Text
            style={[styles.noteDescription, item.completed && styles.completedText]}
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.noteMetadata}>
          <Text style={styles.noteDate}>{item.date}</Text>
          {item.location && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  }}
                  title="Emplacement"
                  description="Localisation de la note"
                />
              </MapView>
            </View>
          )}
          {item.photo && <Text style={styles.noteIcon}>📷</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filtres de catégorie */}
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

<<<<<<< HEAD
<<<<<<< HEAD
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <TimeFilterButton title="Aujourd'hui" value="today" />
        <TimeFilterButton title="Cette semaine" value="week" />
        <TimeFilterButton title="Ce mois" value="month" />
      </ScrollView>

=======
=======
>>>>>>> feature/map-location
      {/* Sélecteur de période */}
      <TimeFilterPicker />

      {/* Bouton d'ajout */}
<<<<<<< HEAD
>>>>>>> feature/filter-tasks
=======
>>>>>>> feature/map-location
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddNote")}
      >
        <Text style={styles.addButtonText}>+ Nouvelle Note</Text>
      </TouchableOpacity>

      {/* Liste des notes/tâches filtrées */}
      <FlatList
        data={filteredNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id.toString()}
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
<<<<<<< HEAD
<<<<<<< HEAD
    height: 40, // Augmenter la hauteur pour les boutons de filtre
=======
>>>>>>> feature/filter-tasks
=======
>>>>>>> feature/map-location
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
  timeFilterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: 200,
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
    fontSize: 18,
    marginLeft: 8,
<<<<<<< HEAD
=======
  },
  mapContainer: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  map: {
    flex: 1,
>>>>>>> feature/map-location
  },
});
