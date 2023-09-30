import React from "react";
import RepInput from "./components/repInput/RepInput";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

interface JumpAttempt {
  id: number;
  feet: string;
  inches: string;
  completed: boolean;
}

interface RepListProps {
  jumpAttempts: JumpAttempt[];
  maxInputLength: number;
  onRepInput: (id: number, feet: string, inches: string) => void;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function RepList({
  jumpAttempts,
  maxInputLength,
  onRepInput,
  onCheckboxChange,
}: RepListProps) {
  return (
    <FlatList
      data={jumpAttempts}
      keyExtractor={(item) => item.id.toString()}
      style={{ height: "70%" }}
      renderItem={({ item }) => (
        <>
          <RepInput
            id={item.id}
            attempt={item}
            maxInputLength={maxInputLength}
            onInputChange={onRepInput}
            onCheckboxChange={onCheckboxChange}
          />
          <Divider />
        </>
      )}
    />
  );
}
