import type { Character, Location, HealthStatus } from '../types';

const NAMES = [
  'Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno', 'Kakashi Hatake', 'Tsunade Senju',
  'Jiraiya', 'Orochimaru', 'Itachi Uchiha', 'Gaara', 'Rock Lee', 'Neji Hyuga', 'Tenten',
  'Shikamaru Nara', 'Ino Yamanaka', 'Choji Akimichi', 'Kiba Inuzuka', 'Shino Aburame',
  'Hinata Hyuga', 'Kurenai Yuhi', 'Asuma Sarutobi', 'Might Guy', 'Temari', 'Kankuro',
  'Chiyo', 'Deidara', 'Sasori', 'Hidan', 'Kakuzu', 'Pain', 'Konan', 'Tobi', 'Zetsu',
  'Kisame Hoshigaki', 'Haku', 'Zabuza Momochi', 'Kabuto Yakushi', 'Anko Mitarashi',
  'Ibiki Morino', 'Genma Shiranui', 'Raido Namiashi', 'Kotetsu Hagane', 'Izumo Kamizuki',
  'Iruka Umino', 'Mizuki', 'Hiruzen Sarutobi', 'Minato Namikaze', 'Kushina Uzumaki',
  'Fugaku Uchiha', 'Mikoto Uchiha', 'Obito Uchiha', 'Rin Nohara', 'Yahiko', 'Nagato',
  'Madara Uchiha', 'Hashirama Senju', 'Tobirama Senju', 'Mito Uzumaki', 'Tsunade',
];

const ADDITIONAL_NAMES = [
  'Akira Tanaka', 'Yuki Sato', 'Ryu Nakamura', 'Mei Watanabe', 'Ken Yoshida',
  'Sora Takahashi', 'Hana Suzuki', 'Dai Kobayashi', 'Rei Kato', 'Jin Yamamoto',
  'Aya Ishida', 'Taro Kimura', 'Yui Hayashi', 'Kyo Saito', 'Nao Matsumoto',
  'Zen Inoue', 'Rio Fujiwara', 'Kai Ogawa', 'Mio Goto', 'Ryo Hasegawa',
  // Adding more unique names to reach 1000+
  'Shin Murakami', 'Yuki Kondo', 'Hiro Ito', 'Nana Nakajima', 'Tomo Aoki',
  'Sara Sasaki', 'Jun Yamazaki', 'Miku Nomura', 'Yuta Okamoto', 'Kira Shimizu',
];

const LOCATIONS: Location[] = ['Konoha', 'Suna', 'Kiri', 'Iwa', 'Kumo'];
const HEALTH_STATUSES: HealthStatus[] = ['Healthy', 'Injured', 'Critical'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomName(): string {
  const allNames = [...NAMES, ...ADDITIONAL_NAMES];
  const baseName = getRandomElement(allNames);
  const suffix = Math.random() > 0.3 ? '' : ` ${Math.floor(Math.random() * 1000)}`;
  return baseName + suffix;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function generateCharacters(count: number = 1000): Character[] {
  const characters: Character[] = [];
  
  for (let i = 0; i < count; i++) {
    characters.push({
      id: generateId(),
      name: generateRandomName(),
      location: getRandomElement(LOCATIONS),
      health: getRandomElement(HEALTH_STATUSES),
      power: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
      isViewed: false,
    });
  }
  
  return characters;
}