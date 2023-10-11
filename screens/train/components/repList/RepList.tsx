import React from "react";
import RepInput from "./components/repInput/RepInput";
import { Dimensions, FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { SessionAttempt } from "../../../../types/session";

interface RepListProps {
  jumpAttempts: SessionAttempt[];
  maxInputLength: number;
  onRepInput: (attemptId: number, feet: string, inches: string) => void;
  onCheckboxChange: (id: number, checked: boolean) => void;
  flatListRef: React.RefObject<FlatList>;
  onDelete: (id: number) => void;
}

const maxHeight = Dimensions.get("window").height - 400;

export default function RepList({
  jumpAttempts,
  maxInputLength,
  onRepInput,
  onCheckboxChange,
  flatListRef,
  onDelete,
}: RepListProps) {
  return (
    <FlatList
      ref={flatListRef}
      data={jumpAttempts}
      keyExtractor={(item) => item.attemptId}
      style={{ maxHeight: maxHeight }}
      renderItem={({ item }) => (
        <>
          <RepInput
            id={item.attemptId}
            attempt={item}
            maxInputLength={maxInputLength}
            onInputChange={onRepInput}
            onCheckboxChange={onCheckboxChange}
            onDelete={onDelete}
          />
          <Divider />
        </>
      )}
    />
  );
}
