#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <DHT.h>
#include <Servo.h>

#define SERVOPIN 14
Servo myServo;

// 와이파이 설정
#define WIFI_ID "bssm_free"
#define WIFI_PASSWORD "bssm_free"

// 파이어베이스 설정
#define FIREBASE_HOST "ioting-3a752-default-rtdb.firebaseio.com"
#define API_KEY "AIzaSyA1K6ALT2e7bDGRgpXmgXWDTJ4udRuHQ8E"

// 파이어베이스 authentication 정보
#define USER_EMAIL "pdh0128a@gmail.com"
#define USER_PASSWORD "kdoornega0128"

FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
void setup()
{
  Serial.begin(115200);

  dht.begin();

  // 와이파이 연결
  WiFi.begin(WIFI_ID, WIFI_PASSWORD); // 인자로 아이디랑 비번
  Serial.print("connecting to WIFI");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.printf("connected with IP :");
  Serial.println(WiFi.localIP());

  // 파이어베이스 설정
  config.host = FIREBASE_HOST;
  config.api_key = API_KEY;

  // 파이어베이스 초기화
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // 파이어베이스 authentication 설정
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // 파이어베이스 로그인
  if (Firebase.signUp(&config, &auth, USER_EMAIL, USER_PASSWORD))
  {
    Serial.println("Firebase Authentication succeeded");
  }
  else
  {
    Serial.printf("Firebase Authentication failed : %s\n", config.signer.signupError.message.c_str());
  }
  // 로그인 상태 확인
  if (Firebase.ready())
  {
    Serial.println("Firebase is ready");
  }
  else
  {
    Serial.println("Firebase is not ready");
  }

  myServo.attach(SERVOPIN);
}

void loop()
{
  // 사용자 고유 id 가져오기
  String uid = auth.token.uid.c_str();

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  String path = "/users/" + uid + "/sensor";

  if (Firebase.setFloat(firebaseData, path + "/temperature", temperature && Firebase.setFloat(firebaseData, path + "/humidity", humidity)))
  {
    Serial.println("Test value success");
  }
  else
  {
    Serial.print("error");
    Serial.println(firebaseData.errorReason());
  }

  float TEMP = 0.8;
  if (temperature > TEMP)
  {
    Serial.println("Temperature");
    for (int pos = 0; pos <= 180; ++pos)
    {
      myServo.write(pos);
      delay(15);
    }
    for (int pos = 180; pos >= 0; --pos)
    {
      myServo.write(pos);
      delay(15);
    }
  }
  delay(5000);
}
