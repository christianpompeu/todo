import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";
import { EditTaskArgs, Task } from "../types/types";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTaskExists = tasks.find((task) => task.title === newTaskTitle);

    if (newTaskExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldstate) => [...oldstate, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const alteredTasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            done: !task.done,
          }
        : task
    );
    setTasks(alteredTasks);
  }

  function handleEditTask({ taskId, newTaskTitle }: EditTaskArgs) {
    const alteredTasks = tasks.map((task) => ({ ...task }));
    const taskToChangeTitle = alteredTasks.find((task) => task.id === taskId);

    if (!taskToChangeTitle) {
      return;
    }

    taskToChangeTitle.title = newTaskTitle;

    setTasks(alteredTasks);

  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            const newTasks = tasks.filter((task) => task.id != id);
            setTasks(newTasks);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
