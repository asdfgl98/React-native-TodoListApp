import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import theme from "./color.js";
import { useRef, useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const inputText = useRef();

  const onChangeText = (payload) => {
    setText(payload);
  };

  const addTodo = () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* </TouchableOpacity> : View와 비슷한 개념으로 이벤트를 받는 View */}
        {/* Opacity : 불투명도로 이 컴포넌트를 사용하면 클릭시 스타일이 투명해졌다가 돌아오는 이벤트가 발생 */}
        {/* View에 이벤트를 주고싶을때 사용하는 컴포넌트*/}
        {/* TouchableWithoutFeedback : 클릭시 UI가 바뀌진 않지만 onPress 등으로 이벤트를 사용할 수있음 */}
        {/* 제일 유용한 이벤트 컴포넌트API는 Pressable로 위 컴포넌트들의 기능이 모두 합쳐져있음 */}
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : "#3A3D40" }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: !working ? "white" : "#3A3D40" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* React Native의 Input */}
        {/* 컴포넌트 props로 keyboardType을 사용하면 입력할 키보드 타입을 설정할 수있다. */}
        {/* 숫자 패드, 이메일 등등 웹검색 등*/}
        <TextInput
          ref={inputText}
          style={styles.input}
          // 텍스트가 입력될 때 이벤트 실행
          onChangeText={onChangeText}
          onSubmitEditing={addTodo}
          value={text}
          placeholder={
            working
              ? "할 일을 추가해주세요."
              : "가고싶은 여행지를 추가해주세요."
          }
        />
      </View>
      <ScrollView>
        {/* Object.keys()를 사용하여 toDos 객체의 키값을 가져와서 배열로 만든 후 map 함수 실행 */}
        {/* 가져온 키 값으로 toDos 객체 가져오기  */}
        {Object.keys(toDos).map((item, index) =>
          toDos[item].working === working ? (
            <View style={styles.toDo} key={index}>
              <Text style={styles.toDoText}>{toDos[item].text}</Text>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    fontWeight: "600",
  },
  // 인풋창 스타일 설정
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 15,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: "#5C5C60",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
