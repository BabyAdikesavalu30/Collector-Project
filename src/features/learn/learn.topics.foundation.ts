/**
 * Foundation-Level Learning Topics (Classes 6–7)
 * Real, grade-appropriate lesson content for the 9 foundation pathways.
 */

import { LearningTopic } from './learn.types';

export const FOUNDATION_TOPICS: Record<string, LearningTopic[]> = {
  // ==================== phy-f-1 Force & Motion ====================
  'phy-f-1': [
    {
      id: 'phyf1-t1',
      title: { en: 'Push and Pull Forces', ta: 'தள்ளும் மற்றும் இழுக்கும் விசைகள்' },
      summary: {
        en: 'A force is a push or a pull acting on an object. Forces can start motion, stop motion, change speed, or change direction. You apply forces all the time — pushing a door open, pulling a drawer, or kicking a ball.',
        ta: 'விசை என்பது ஒரு பொருளின் மீது செயல்படும் தள்ளுதல் அல்லது இழுத்தல் ஆகும். விசைகள் இயக்கத்தைத் தொடங்கலாம், நிறுத்தலாம், வேகத்தை மாற்றலாம் அல்லது திசையை மாற்றலாம். கதவைத் தள்ளுவது, இழுப்பறையை இழுப்பது, பந்தை உதைப்பது — இவை அனைத்திலும் நீங்கள் விசையைப் பயன்படுத்துகிறீர்கள்.',
      },
      keyPoints: [
        { en: 'Force = push or pull on an object', ta: 'விசை = பொருளின் மீது தள்ளுதல் அல்லது இழுத்தல்' },
        { en: 'Force can start or stop motion', ta: 'விசை இயக்கத்தைத் தொடங்கலாம் அல்லது நிறுத்தலாம்' },
        { en: 'Force can change speed or direction', ta: 'விசை வேகத்தையோ திசையையோ மாற்றலாம்' },
      ],
    },
    {
      id: 'phyf1-t2',
      title: { en: 'Speed and Motion', ta: 'வேகமும் இயக்கமும்' },
      summary: {
        en: 'Speed tells us how fast an object moves. It is calculated by dividing the distance travelled by the time taken: Speed = Distance ÷ Time. A car that covers 60 km in 2 hours travels at 30 km/h.',
        ta: 'ஒரு பொருள் எவ்வளவு வேகமாக நகர்கிறது என்பதை வேகம் கூறுகிறது. கடந்த தொலைவை எடுத்த நேரத்தால் வகுத்தால் வேகம் கிடைக்கும்: வேகம் = தொலைவு ÷ நேரம். 2 மணி நேரத்தில் 60 கிமீ கடக்கும் கார் 30 கிமீ/மணி வேகத்தில் செல்கிறது.',
      },
      keyPoints: [
        { en: 'Speed = Distance ÷ Time', ta: 'வேகம் = தொலைவு ÷ நேரம்' },
        { en: 'Speed is measured in km/h or m/s', ta: 'வேகம் கிமீ/மணி அல்லது மீ/வி-இல் அளக்கப்படுகிறது' },
        { en: 'A stopwatch measures time', ta: 'நிறுத்து கடிகாரம் நேரத்தை அளவிடுகிறது' },
      ],
    },
    {
      id: 'phyf1-t3',
      title: { en: 'Gravity', ta: 'ஈர்ப்பு விசை' },
      summary: {
        en: 'Gravity is the force that pulls everything towards the centre of the Earth. That is why a dropped pencil falls down instead of floating away. The Moon also pulls on Earth, which causes the tides in the sea.',
        ta: 'பூமியின் மையத்தை நோக்கி அனைத்தையும் இழுக்கும் விசை ஈர்ப்பு விசை. அதனால்தான் கீழே போட்ட பென்சில் மிதந்து செல்லாமல் கீழே விழுகிறது. நிலாவும் பூமியை இழுக்கிறது; இதனால் கடலில் அலைகள் உருவாகின்றன.',
      },
      keyPoints: [
        { en: 'Gravity pulls objects towards Earth\'s centre', ta: 'ஈர்ப்பு விசை பொருட்களை பூமி மையத்தை நோக்கி இழுக்கிறது' },
        { en: 'Things fall down because of gravity', ta: 'ஈர்ப்பு விசையால் பொருட்கள் கீழே விழுகின்றன' },
        { en: 'The Moon\'s pull causes sea tides', ta: 'நிலாவின் இழுப்பால் கடல் அலைகள் உருவாகின்றன' },
      ],
    },
    {
      id: 'phyf1-t4',
      title: { en: 'Friction', ta: 'உராய்வு' },
      summary: {
        en: 'Friction is the force that opposes motion when two surfaces rub against each other. It slows moving objects and helps us walk, hold things, and stop vehicles. Rough surfaces create more friction than smooth ones.',
        ta: 'இரண்டு பரப்புகள் ஒன்றையொன்று தேய்க்கும்போது இயக்கத்தை எதிர்க்கும் விசை உராய்வு. இது நகரும் பொருட்களை மெதுவாக்குகிறது; நடக்கவும், பொருட்களைப் பிடிக்கவும், வாகனங்களை நிறுத்தவும் உதவுகிறது. கரடுமுரடான பரப்புகள் மென்மையானவற்றை விட அதிக உராய்வை உருவாக்குகின்றன.',
      },
      keyPoints: [
        { en: 'Friction opposes motion', ta: 'உராய்வு இயக்கத்தை எதிர்க்கிறது' },
        { en: 'Rough surfaces cause more friction', ta: 'கரடுமுரடான பரப்புகள் அதிக உராய்வை ஏற்படுத்துகின்றன' },
        { en: 'Friction helps us walk and stop', ta: 'நடக்கவும் நிற்கவும் உராய்வு உதவுகிறது' },
      ],
    },
  ],

  // ==================== phy-f-2 Light & Shadows ====================
  'phy-f-2': [
    {
      id: 'phyf2-t1',
      title: { en: 'How Light Travels', ta: 'ஒளி எவ்வாறு பயணிக்கிறது' },
      summary: {
        en: 'Light travels in straight lines at very high speed. Because light moves in straight lines, it can be blocked to form shadows and reflected to form images. Luminous objects like the Sun and bulbs give out their own light.',
        ta: 'ஒளி மிக அதிக வேகத்தில் நேர்க்கோட்டில் பயணிக்கிறது. ஒளி நேர்க்கோட்டில் செல்வதால் அதைத் தடுத்து நிழல்களை உருவாக்கலாம்; எதிரொளித்து பிம்பங்களை உருவாக்கலாம். சூரியன், விளக்குகள் போன்ற ஒளிரும் பொருட்கள் தானாக ஒளியை வெளியிடுகின்றன.',
      },
      keyPoints: [
        { en: 'Light travels in straight lines', ta: 'ஒளி நேர்க்கோட்டில் பயணிக்கிறது' },
        { en: 'Luminous objects give out their own light', ta: 'ஒளிரும் பொருட்கள் தானாக ஒளியை வெளியிடுகின்றன' },
        { en: 'Non-luminous objects reflect light', ta: 'ஒளிராத பொருட்கள் ஒளியை எதிரொளிக்கின்றன' },
      ],
    },
    {
      id: 'phyf2-t2',
      title: { en: 'Shadows', ta: 'நிழல்கள்' },
      summary: {
        en: 'A shadow forms when an opaque object blocks light, so light cannot reach the space behind it. The size and shape of a shadow change with the position of the light source. At noon, when the Sun is overhead, shadows are very short.',
        ta: 'ஒளிபுகா பொருள் ஒளியைத் தடுக்கும்போது, ஒளி அதன் பின்னால் உள்ள இடத்தை அடைய முடியாமல் போகும்போது நிழல் உருவாகிறது. ஒளி மூலத்தின் நிலைக்கு ஏற்ப நிழலின் அளவும் வடிவமும் மாறும். நண்பகலில் சூரியன் மேலே இருக்கும்போது நிழல் மிகக் குறுகியதாக இருக்கும்.',
      },
      keyPoints: [
        { en: 'Opaque objects block light to form shadows', ta: 'ஒளிபுகா பொருட்கள் ஒளியைத் தடுத்து நிழல் உருவாக்குகின்றன' },
        { en: 'Shadow size depends on light position', ta: 'நிழல் அளவு ஒளியின் நிலையைப் பொறுத்தது' },
        { en: 'Morning and evening shadows are long', ta: 'காலையிலும் மாலையிலும் நிழல்கள் நீளமாக இருக்கும்' },
      ],
    },
    {
      id: 'phyf2-t3',
      title: { en: 'Reflection and Mirrors', ta: 'எதிரொளிப்பும் கண்ணாடிகளும்' },
      summary: {
        en: 'When light strikes a smooth shiny surface like a mirror, it bounces back. This bouncing of light is called reflection. A plane mirror forms an upright, virtual image of the same size as the object — this is how you see yourself in a mirror.',
        ta: 'கண்ணாடி போன்ற மென்மையான பளபளப்பான பரப்பில் ஒளி படும்போது அது திரும்பி வருகிறது. ஒளி திரும்பி வருவது எதிரொளிப்பு எனப்படும். தள ஆடி பொருளின் அளவில் நேரான, மாய பிம்பத்தை உருவாக்குகிறது — கண்ணாடியில் உங்களைப் பார்ப்பது இப்படித்தான்.',
      },
      keyPoints: [
        { en: 'Reflection is light bouncing back', ta: 'ஒளி திரும்பி வருவது எதிரொளிப்பு' },
        { en: 'Mirrors are smooth, shiny surfaces', ta: 'கண்ணாடிகள் மென்மையான, பளபளப்பான பரப்புகள்' },
        { en: 'Plane mirrors make same-size upright images', ta: 'தள ஆடிகள் அதே அளவில் நேரான பிம்பங்களை உருவாக்குகின்றன' },
      ],
    },
  ],

  // ==================== phy-f-3 Matter & Measurement ====================
  'phy-f-3': [
    {
      id: 'phyf3-t1',
      title: { en: 'States of Matter', ta: 'பொருளின் நிலைகள்' },
      summary: {
        en: 'Matter exists in three common states: solid, liquid, and gas. Solids have a fixed shape and volume. Liquids flow and take the shape of their container. Gases spread out to fill all the space available. Ice, water, and steam are the same substance in these three states.',
        ta: 'பொருள் மூன்று பொதுவான நிலைகளில் உள்ளது: திண்மம், நீர்மம், வாயு. திண்மங்களுக்கு நிலையான வடிவமும் கன அளவும் உண்டு. நீர்மங்கள் ஓடக்கூடியவை; தாங்கியின் வடிவத்தை எடுக்கின்றன. வாயுக்கள் பரவி கிடைக்கும் இடம் முழுவதையும் நிரப்புகின்றன. பனிக்கட்டி, நீர், நீராவி ஆகியவை இந்த மூன்று நிலைகளில் உள்ள ஒரே பொருளே.',
      },
      keyPoints: [
        { en: 'Three states: solid, liquid, gas', ta: 'மூன்று நிலைகள்: திண்மம், நீர்மம், வாயு' },
        { en: 'Solids keep their shape', ta: 'திண்மங்கள் தங்கள் வடிவத்தை வைத்திருக்கின்றன' },
        { en: 'Gases fill all available space', ta: 'வாயுக்கள் கிடைக்கும் இடம் முழுவதையும் நிரப்புகின்றன' },
      ],
    },
    {
      id: 'phyf3-t2',
      title: { en: 'Measuring Length and Mass', ta: 'நீளம் மற்றும் நிறையை அளவிடுதல்' },
      summary: {
        en: 'The standard unit of length is the metre, and larger distances are measured in kilometres (1 km = 1000 m). Mass is the amount of matter in an object, measured in kilograms and grams using a weighing scale. Accurate measurement helps scientists compare results.',
        ta: 'நீளத்தின் நிலையான அலகு மீட்டர்; பெரிய தொலைவுகள் கிலோமீட்டரில் அளக்கப்படுகின்றன (1 கிமீ = 1000 மீ). நிறை என்பது ஒரு பொருளில் உள்ள பொருளின் அளவு; நிறை அளவி மூலம் கிலோகிராம் மற்றும் கிராமில் அளக்கப்படுகிறது. துல்லியமான அளவீடு விஞ்ஞானிகள் முடிவுகளை ஒப்பிட உதவுகிறது.',
      },
      keyPoints: [
        { en: 'Length is measured in metres', ta: 'நீளம் மீட்டரில் அளக்கப்படுகிறது' },
        { en: 'Mass is measured in kilograms/grams', ta: 'நிறை கிலோகிராம்/கிராமில் அளக்கப்படுகிறது' },
        { en: '1 km = 1000 m', ta: '1 கிமீ = 1000 மீ' },
      ],
    },
    {
      id: 'phyf3-t3',
      title: { en: 'Measuring Volume', ta: 'கன அளவை அளவிடுதல்' },
      summary: {
        en: 'Volume is the amount of space an object or liquid takes up. Liquids are measured in millilitres and litres using a measuring cylinder. The volume of an irregular solid can be found by dropping it into water and measuring how much the water level rises.',
        ta: 'கன அளவு என்பது ஒரு பொருள் அல்லது நீர்மம் எடுத்துக்கொள்ளும் இடத்தின் அளவு. நீர்மங்கள் அளவு உருளை மூலம் மில்லிலிட்டர் மற்றும் லிட்டரில் அளக்கப்படுகின்றன. ஒழுங்கற்ற திண்மத்தின் கன அளவை, அதை நீரில் போட்டு நீர் மட்டம் எவ்வளவு உயர்கிறது என்பதை அளந்து கண்டறியலாம்.',
      },
      keyPoints: [
        { en: 'Volume = space taken up', ta: 'கன அளவு = எடுத்துக்கொள்ளும் இடம்' },
        { en: 'Measuring cylinders measure liquids', ta: 'அளவு உருளைகள் நீர்மங்களை அளக்கின்றன' },
        { en: 'Water displacement measures solid volume', ta: 'நீர் இடப்பெயர்ச்சி திண்ம கன அளவை அளக்கிறது' },
      ],
    },
  ],

  // ==================== chem-f-1 Matter & Materials ====================
  'chem-f-1': [
    {
      id: 'chemf1-t1',
      title: { en: 'Solids, Liquids and Gases', ta: 'திண்மம், நீர்மம் மற்றும் வாயு' },
      summary: {
        en: 'Everything around us is matter, and matter comes in three states. Solids like wood and stones keep their shape. Liquids like milk and water flow and take the shape of their container. Gases like air spread everywhere. Heating or cooling can change one state into another.',
        ta: 'நம்மைச் சுற்றியுள்ள அனைத்தும் பொருள்; பொருள் மூன்று நிலைகளில் உள்ளது. மரம், கற்கள் போன்ற திண்மங்கள் தங்கள் வடிவத்தை வைத்திருக்கும். பால், நீர் போன்ற நீர்மங்கள் ஓடி தாங்கியின் வடிவத்தை எடுக்கும். காற்று போன்ற வாயுக்கள் எங்கும் பரவும். சூடாக்குவதும் குளிர்விப்பதும் ஒரு நிலையை மற்றொன்றாக மாற்றும்.',
      },
      keyPoints: [
        { en: 'Matter is anything that has mass and volume', ta: 'நிறையும் கன அளவும் உள்ளது அனைத்தும் பொருள்' },
        { en: 'States change with heating and cooling', ta: 'சூடாக்கல்-குளிர்விப்பால் நிலைகள் மாறுகின்றன' },
        { en: 'Air is a mixture of gases', ta: 'காற்று வாயுக்களின் கலவை' },
      ],
    },
    {
      id: 'chemf1-t2',
      title: { en: 'Mixtures Around Us', ta: 'நம்மைச் சுற்றியுள்ள கலவைகள்' },
      summary: {
        en: 'A mixture contains two or more substances that are not chemically joined. Air, sea water, and soil are common mixtures. In a mixture, each substance keeps its own properties, and the substances can often be separated by simple methods like filtering, sieving, or hand-picking.',
        ta: 'கலவையில் இரண்டு அல்லது அதற்கு மேற்பட்ட பொருட்கள் வேதியியல் முறையில் இணையாமல் உள்ளன. காற்று, கடல் நீர், மண் ஆகியவை பொதுவான கலவைகள். கலவையில் ஒவ்வொரு பொருளும் தன் பண்புகளை வைத்திருக்கும்; வடிகட்டுதல், சல்லடையிடுதல், கைப்பறித்தல் போன்ற எளிய முறைகளால் பெரும்பாலும் பிரிக்கலாம்.',
      },
      keyPoints: [
        { en: 'Mixtures are not chemically joined', ta: 'கலவைகள் வேதியியல் முறையில் இணைந்தவை அல்ல' },
        { en: 'Air and sea water are mixtures', ta: 'காற்றும் கடல் நீரும் கலவைகள்' },
        { en: 'Simple methods can separate mixtures', ta: 'எளிய முறைகளால் கலவைகளைப் பிரிக்கலாம்' },
      ],
    },
    {
      id: 'chemf1-t3',
      title: { en: 'Dissolving and Separation', ta: 'கரைதலும் பிரித்தலும்' },
      summary: {
        en: 'Some substances dissolve in water to form a solution, like sugar or salt. Others, like sand or oil, do not dissolve. Solutions can be separated by evaporation — heating the water away leaves the dissolved solid behind, which is how salt is obtained from sea water.',
        ta: 'சில பொருட்கள் தண்ணீரில் கரைந்து கரைசலை உருவாக்குகின்றன, சர்க்கரை, உப்பு போன்றவை. மணல், எண்ணெய் போன்றவை கரைவதில்லை. ஆவியாதல் மூலம் கரைசல்களைப் பிரிக்கலாம் — நீரை சூடாக்கி ஆவியாக்கினால் கரைந்த திண்மம் எஞ்சும்; கடல் நீரிலிருந்து உப்பு பெறப்படுவது இப்படித்தான்.',
      },
      keyPoints: [
        { en: 'Soluble substances form solutions', ta: 'கரையக்கூடிய பொருட்கள் கரைசலை உருவாக்குகின்றன' },
        { en: 'Evaporation separates dissolved solids', ta: 'ஆவியாதல் கரைந்த திண்மங்களை பிரிக்கிறது' },
        { en: 'Filtration separates undissolved solids', ta: 'வடிகட்டுதல் கரையாத திண்மங்களை பிரிக்கிறது' },
      ],
    },
  ],

  // ==================== chem-f-2 Acids, Bases & Salts ====================
  'chem-f-2': [
    {
      id: 'chemf2-t1',
      title: { en: 'Sour and Bitter Substances', ta: 'புளிப்பு மற்றும் கசப்பு பொருட்கள்' },
      summary: {
        en: 'Substances that taste sour, like lemon, orange, and curd, contain acids. Substances that taste bitter and feel soapy, like soap and toothpaste, are bases. Acids and bases are two important groups of substances with opposite properties.',
        ta: 'எலுமிச்சை, ஆரஞ்சு, தயிர் போன்ற புளிப்பு சுவை கொண்ட பொருட்களில் அமிலம் உள்ளது. சோப்பு, பற்பசை போன்ற கசப்பும் வழுக்கலும் உள்ளவை காரங்கள். அமிலங்களும் காரங்களும் எதிர் பண்புகள் கொண்ட இரண்டு முக்கிய பொருள் வகைகள்.',
      },
      keyPoints: [
        { en: 'Sour foods contain acids', ta: 'புளிப்பு உணவுகளில் அமிலம் உள்ளது' },
        { en: 'Bitter, soapy substances are bases', ta: 'கசப்பான, வழுக்கலானவை காரங்கள்' },
        { en: 'Acids and bases have opposite properties', ta: 'அமிலமும் காரமும் எதிர் பண்புகள் கொண்டவை' },
      ],
    },
    {
      id: 'chemf2-t2',
      title: { en: 'Natural Indicators', ta: 'இயற்கை குறிகாட்டிகள்' },
      summary: {
        en: 'Indicators are substances that change colour to tell us if something is an acid or a base. Turmeric turns red in a base and stays yellow in an acid. Litmus paper is another common indicator: blue litmus turns red in acids, and red litmus turns blue in bases.',
        ta: 'ஒரு பொருள் அமிலமா காரமா என்பதை நிறம் மாற்றிக் காட்டும் பொருட்கள் குறிகாட்டிகள். மஞ்சள் காரத்தில் சிவப்பாகவும், அமிலத்தில் மஞ்சளாகவும் மாறும். லிட்மஸ் தாள் மற்றொரு பொதுவான குறிகாட்டி: நீல லிட்மஸ் அமிலத்தில் சிவப்பாகவும், சிவப்பு லிட்மஸ் காரத்தில் நீலமாகவும் மாறும்.',
      },
      keyPoints: [
        { en: 'Indicators change colour in acids/bases', ta: 'குறிகாட்டிகள் அமிலம்/காரத்தில் நிறம் மாறுகின்றன' },
        { en: 'Turmeric turns red in bases', ta: 'மஞ்சள் காரத்தில் சிவப்பாகிறது' },
        { en: 'Litmus is a natural indicator', ta: 'லிட்மஸ் ஒரு இயற்கை குறிகாட்டி' },
      ],
    },
    {
      id: 'chemf2-t3',
      title: { en: 'Acids and Bases in Daily Life', ta: 'அன்றாட வாழ்வில் அமிலங்களும் காரங்களும்' },
      summary: {
        en: 'Acids and bases are found everywhere around us. Vinegar contains acetic acid, and ant bites contain formic acid. Baking soda and soap are bases. We use acids and bases every day in cleaning, cooking, and even in our bodies — our stomach uses acid to digest food.',
        ta: 'அமிலங்களும் காரங்களும் நம்மைச் சுற்றி எங்கும் உள்ளன. வினிகரில் அசிட்டிக் அமிலம் உள்ளது; எறும்பு கடியில் ஃபார்மிக் அமிலம் உள்ளது. சமையல் சோடா மற்றும் சோப்பு காரங்கள். சுத்தம் செய்வதிலும், சமைப்பதிலும், நம் உடலிலும் அமிலம்-காரத்தை தினமும் பயன்படுத்துகிறோம் — உணவு செரிக்க நம் வயிறு அமிலத்தைப் பயன்படுத்துகிறது.',
      },
      keyPoints: [
        { en: 'Vinegar contains acetic acid', ta: 'வினிகரில் அசிட்டிக் அமிலம் உள்ளது' },
        { en: 'Soap and baking soda are bases', ta: 'சோப்பும் சமையல் சோடாவும் காரங்கள்' },
        { en: 'Stomach uses acid to digest food', ta: 'உணவு செரிக்க வயிறு அமிலத்தைப் பயன்படுத்துகிறது' },
      ],
    },
    {
      id: 'chemf2-t4',
      title: { en: 'Neutralisation', ta: 'நடுநிலையாக்கல்' },
      summary: {
        en: 'When an acid reacts with a base, they cancel each other\'s properties in a reaction called neutralisation. The products are salt and water. Neutralisation is useful: an antacid (a mild base) relieves stomach acidity, and gardeners use lime (a base) to treat acidic soil.',
        ta: 'அமிலம் காரத்துடன் வினைபுரியும்போது ஒன்றின் பண்புகளை மற்றொன்று நடுநிலையாக்கும்; இந்த வினை நடுநிலையாக்கல் எனப்படும். விளைபொருட்கள் உப்பும் நீரும். நடுநிலையாக்கல் பயனுள்ளது: ஆன்டாசிட் (மென்மையான காரம்) வயிற்று அமிலத்தை நீக்குகிறது; தோட்டக்காரர்கள் அமில மண்ணை சீராக்க சுண்ணாம்பைப் பயன்படுத்துகின்றனர்.',
      },
      keyPoints: [
        { en: 'Acid + Base → Salt + Water', ta: 'அமிலம் + காரம் → உப்பு + நீர்' },
        { en: 'Antacids neutralise stomach acid', ta: 'ஆன்டாசிட்கள் வயிற்று அமிலத்தை நடுநிலையாக்குகின்றன' },
        { en: 'Neutralisation cancels acid and base properties', ta: 'நடுநிலையாக்கல் அமில-கார பண்புகளை நீக்குகிறது' },
      ],
    },
  ],

  // ==================== chem-f-3 Air & Water Resources ====================
  'chem-f-3': [
    {
      id: 'chemf3-t1',
      title: { en: 'Composition of Air', ta: 'காற்றின் அமைப்பு' },
      summary: {
        en: 'Air is a mixture of gases. It is about 78% nitrogen and 21% oxygen, with small amounts of carbon dioxide and other gases. Oxygen supports burning and is essential for breathing. Plants use carbon dioxide for photosynthesis, so air connects plants and animals.',
        ta: 'காற்று வாயுக்களின் கலவை. இதில் சுமார் 78% நைட்ரஜன், 21% ஆக்ஸிஜன், சிறிதளவு கார்பன் டை ஆக்சைடு மற்றும் பிற வாயுக்கள் உள்ளன. ஆக்ஸிஜன் எரிதலை ஆதரிக்கிறது; சுவாசத்திற்கு அவசியம். ஒளிச்சேர்க்கைக்கு தாவரங்கள் கார்பன் டை ஆக்சைடைப் பயன்படுத்துகின்றன — இதனால் காற்று தாவரங்களையும் விலங்குகளையும் இணைக்கிறது.',
      },
      keyPoints: [
        { en: 'Air is mostly nitrogen (78%)', ta: 'காற்றில் அதிகம் நைட்ரஜன் (78%)' },
        { en: 'Oxygen supports burning and breathing', ta: 'ஆக்ஸிஜன் எரிதலையும் சுவாசத்தையும் ஆதரிக்கிறது' },
        { en: 'Plants use carbon dioxide', ta: 'தாவரங்கள் கார்பன் டை ஆக்சைடைப் பயன்படுத்துகின்றன' },
      ],
    },
    {
      id: 'chemf3-t2',
      title: { en: 'The Water Cycle', ta: 'நீர் சுழற்சி' },
      summary: {
        en: 'Water keeps moving between the Earth and the sky in the water cycle. The Sun heats seas and rivers, causing evaporation. Water vapour cools high in the air and condenses into clouds, then falls back as rain. This cycle supplies us with fresh water again and again.',
        ta: 'நீர் சுழற்சியில் நீர் பூமிக்கும் வானத்திற்கும் இடையே தொடர்ந்து நகர்கிறது. சூரியன் கடல் மற்றும் ஆறுகளைச் சூடாக்கி ஆவியாக்குகிறது. நீராவி காற்றில் உயரத்தில் குளிர்ந்து மேகங்களாக ஒடுங்கி, பின்னர் மழையாக பொழிகிறது. இந்த சுழற்சி நமக்கு மீண்டும் மீண்டும் நன்னீரை அளிக்கிறது.',
      },
      keyPoints: [
        { en: 'Evaporation: water becomes vapour', ta: 'ஆவியாதல்: நீர் நீராவியாகிறது' },
        { en: 'Condensation: vapour forms clouds', ta: 'கருக்கட்டல்: நீராவி மேகங்களாகிறது' },
        { en: 'Rain returns water to the Earth', ta: 'மழை நீரை பூமிக்கு திருப்புகிறது' },
      ],
    },
    {
      id: 'chemf3-t3',
      title: { en: 'Clean Water for Everyone', ta: 'அனைவருக்கும் தூய நீர்' },
      summary: {
        en: 'Clean water is essential for life, but water gets polluted by waste, sewage, and chemicals. Simple methods like filtering remove solid dirt, and boiling kills germs. Conserving water — closing taps, fixing leaks, and harvesting rainwater — protects this precious resource.',
        ta: 'வாழ்க்கைக்கு தூய நீர் அவசியம்; ஆனால் கழிவுகள், கழிவுநீர், ரசாயனங்களால் நீர் மாசுபடுகிறது. வடிகட்டுதல் போன்ற எளிய முறைகள் திட அழுக்கை நீக்குகின்றன; கொதிக்க வைப்பது கிருமிகளை அழிக்கிறது. தண்ணீரைச் சேமிப்பது — குழாய்களை மூடுவது, கசிவுகளை சரிசெய்வது, மழைநீர் சேகரிப்பு — இந்த விலைமதிப்பற்ற வளத்தைப் பாதுகாக்கிறது.',
      },
      keyPoints: [
        { en: 'Boiling and filtering purify water', ta: 'கொதிக்க வைத்தலும் வடிகட்டுதலும் நீரை சுத்திகரிக்கின்றன' },
        { en: 'Pollution makes water unsafe', ta: 'மாசுபாடு நீரை பாதுகாப்பற்றதாக்குகிறது' },
        { en: 'Saving water protects the resource', ta: 'நீரைச் சேமிப்பது வளத்தைப் பாதுகாக்கிறது' },
      ],
    },
  ],

  // ==================== bio-f-1 Living Organisms & Habitat ====================
  'bio-f-1': [
    {
      id: 'biof1-t1',
      title: { en: 'What Living Things Need', ta: 'உயிரினங்களுக்கு என்ன தேவை' },
      summary: {
        en: 'All living things share basic needs: food for energy, water for life processes, and air for respiration. Living things also grow, respond to their surroundings, reproduce, and get rid of wastes. Non-living things like rocks and chairs do none of these.',
        ta: 'அனைத்து உயிரினங்களுக்கும் அடிப்படை தேவைகள் உள்ளன: ஆற்றலுக்கு உணவு, உயிர் செயல்முறைகளுக்கு நீர், சுவாசத்திற்கு காற்று. உயிரினங்கள் வளரும், சூழலுக்கு எதிர்வினை காட்டும், இனப்பெருக்கம் செய்யும், கழிவுகளை நீக்கும். பாறை, நாற்காலி போன்ற உயிரற்றவை இவை எதையும் செய்வதில்லை.',
      },
      keyPoints: [
        { en: 'Living things need food, water, and air', ta: 'உயிரினங்களுக்கு உணவு, நீர், காற்று தேவை' },
        { en: 'Living things grow and reproduce', ta: 'உயிரினங்கள் வளர்ந்து இனப்பெருக்கம் செய்கின்றன' },
        { en: 'Non-living things do not grow', ta: 'உயிரற்றவை வளர்வதில்லை' },
      ],
    },
    {
      id: 'biof1-t2',
      title: { en: 'Habitats', ta: 'வாழிடங்கள்' },
      summary: {
        en: 'A habitat is the natural home of an organism — the place where it finds food, water, shelter, and space. Fish live in aquatic habitats, camels live in deserts, and polar bears live in icy regions. Every habitat provides what its residents need to survive.',
        ta: 'வாழிடம் என்பது உயிரினத்தின் இயற்கையான வீடு — உணவு, நீர், தங்குமிடம், இடத்தை அது கண்டடையும் இடம். மீன்கள் நீர்வாழ் வாழிடங்களிலும், ஒட்டகங்கள் பாலைவனங்களிலும், துருவ கரடிகள் பனிப் பகுதிகளிலும் வாழ்கின்றன. ஒவ்வொரு வாழிடமும் அதில் வசிப்பவர்களுக்குத் தேவையானதை அளிக்கிறது.',
      },
      keyPoints: [
        { en: 'Habitat = natural home of an organism', ta: 'வாழிடம் = உயிரினத்தின் இயற்கை வீடு' },
        { en: 'Habitats provide food, water, and shelter', ta: 'வாழிடங்கள் உணவு, நீர், தங்குமிடம் அளிக்கின்றன' },
        { en: 'Different organisms live in different habitats', ta: 'வெவ்வேறு உயிரினங்கள் வெவ்வேறு வாழிடங்களில் வாழ்கின்றன' },
      ],
    },
    {
      id: 'biof1-t3',
      title: { en: 'Adaptations', ta: 'தகவமைப்புகள்' },
      summary: {
        en: 'Adaptations are special features that help organisms survive in their habitat. A camel stores fat in its hump for long desert journeys, a cactus stores water in its thick stem, and a polar bear has thick fur for freezing cold. Adaptations develop over many generations.',
        ta: 'தகவமைப்புகள் என்பவை உயிரினங்கள் தங்கள் வாழிடத்தில் உயிர்வாழ உதவும் சிறப்பு அம்சங்கள். நீண்ட பாலைவன பயணத்திற்கு ஒட்டகம் தன் திமிலில் கொழுப்பைச் சேமிக்கிறது; கள்ளி தன் தடித்த தண்டில் நீரைச் சேமிக்கிறது; துருவ கரடிக்கு உறைபனிக்கு தடித்த உரோமம் உண்டு. தகவமைப்புகள் பல தலைமுறைகளாக உருவாகின்றன.',
      },
      keyPoints: [
        { en: 'Adaptations help survival in a habitat', ta: 'தகவமைப்புகள் வாழிடத்தில் உயிர்வாழ உதவுகின்றன' },
        { en: 'Camels store fat in their hump', ta: 'ஒட்டகங்கள் திமிலில் கொழுப்பைச் சேமிக்கின்றன' },
        { en: 'Cacti store water in their stems', ta: 'கள்ளிகள் தண்டில் நீரைச் சேமிக்கின்றன' },
      ],
    },
    {
      id: 'biof1-t4',
      title: { en: 'Ecosystems', ta: 'சூழலமைப்புகள்' },
      summary: {
        en: 'An ecosystem is made of living organisms together with the non-living things around them — soil, water, and air — all interacting in one place. A pond, a forest, and even a small garden are ecosystems. Removing one part can disturb the whole balance.',
        ta: 'சூழலமைப்பு என்பது ஒரே இடத்தில் தொடர்பு கொள்ளும் உயிரினங்களும் அவற்றைச் சுற்றியுள்ள உயிரற்றவையும் — மண், நீர், காற்று — சேர்ந்ததாகும். குளம், காடு, சிறிய தோட்டம் கூட சூழலமைப்புகளே. ஒரு பகுதியை நீக்கினால் முழு சமநிலையும் பாதிக்கப்படலாம்.',
      },
      keyPoints: [
        { en: 'Ecosystem = living + non-living together', ta: 'சூழலமைப்பு = உயிருள்ள + உயிரற்றவை இணைந்தவை' },
        { en: 'Ponds and forests are ecosystems', ta: 'குளங்களும் காடுகளும் சூழலமைப்புகள்' },
        { en: 'All parts of an ecosystem interact', ta: 'சூழலமைப்பின் அனைத்து பகுதிகளும் தொடர்பு கொள்கின்றன' },
      ],
    },
  ],

  // ==================== bio-f-2 Plants & Nutrition ====================
  'bio-f-2': [
    {
      id: 'biof2-t1',
      title: { en: 'Parts of a Plant', ta: 'தாவரத்தின் பாகங்கள்' },
      summary: {
        en: 'A typical plant has roots, a stem, leaves, flowers, and fruits. Roots anchor the plant and absorb water and minerals from the soil. The stem supports the plant and carries water and food between roots and leaves. Leaves are the food factories of the plant.',
        ta: 'வழக்கமான தாவரத்திற்கு வேர்கள், தண்டு, இலைகள், பூக்கள், பழங்கள் உண்டு. வேர்கள் தாவரத்தை நிலைநிறுத்தி மண்ணிலிருந்து நீரையும் தாதுக்களையும் உறிஞ்சுகின்றன. தண்டு தாவரத்தைத் தாங்கி, வேர்களுக்கும் இலைகளுக்கும் இடையே நீரையும் உணவையும் கொண்டு செல்கிறது. இலைகள் தாவரத்தின் உணவு தொழிற்சாலைகள்.',
      },
      keyPoints: [
        { en: 'Roots absorb water and minerals', ta: 'வேர்கள் நீரையும் தாதுக்களையும் உறிஞ்சுகின்றன' },
        { en: 'Stems support and transport', ta: 'தண்டுகள் தாங்கி கொண்டு செல்கின்றன' },
        { en: 'Leaves make food', ta: 'இலைகள் உணவு தயாரிக்கின்றன' },
      ],
    },
    {
      id: 'biof2-t2',
      title: { en: 'Photosynthesis — Making Food', ta: 'ஒளிச்சேர்க்கை — உணவு தயாரித்தல்' },
      summary: {
        en: 'Green plants make their own food through photosynthesis. Using sunlight, water from the roots, and carbon dioxide from the air, leaves produce glucose (food) and release oxygen. The green pigment chlorophyll in the leaves captures sunlight for this process.',
        ta: 'பச்சை தாவரங்கள் ஒளிச்சேர்க்கை மூலம் தங்கள் உணவைத் தாங்களே தயாரிக்கின்றன. சூரிய ஒளி, வேர்களிலிருந்து நீர், காற்றிலிருந்து கார்பன் டை ஆக்சைடு ஆகியவற்றைப் பயன்படுத்தி, இலைகள் குளுக்கோஸை (உணவு) உருவாக்கி ஆக்ஸிஜனை வெளியிடுகின்றன. இலைகளில் உள்ள குளோரோபில் என்ற பச்சை நிறமி இதற்காக சூரிய ஒளியைப் பிடிக்கிறது.',
      },
      keyPoints: [
        { en: 'Photosynthesis makes food in leaves', ta: 'ஒளிச்சேர்க்கை இலைகளில் உணவைத் தயாரிக்கிறது' },
        { en: 'It needs sunlight, water, and CO₂', ta: 'இதற்கு சூரிய ஒளி, நீர், CO₂ தேவை' },
        { en: 'Oxygen is released as a by-product', ta: 'ஆக்ஸிஜன் துணை விளைபொருளாக வெளியிடப்படுகிறது' },
      ],
    },
    {
      id: 'biof2-t3',
      title: { en: 'Water Transport in Plants', ta: 'தாவரங்களில் நீர் கடத்தல்' },
      summary: {
        en: 'Plants carry water from the roots up to the leaves through tiny tubes in the stem. Water is lost from the leaves as vapour through tiny pores called stomata — this loss is transpiration. Transpiration actually helps pull fresh water up from the roots, like a straw.',
        ta: 'தண்டில் உள்ள நுண் குழாய்கள் வழியே தாவரங்கள் வேர்களிலிருந்து இலைகளுக்கு நீரை எடுத்துச் செல்கின்றன. ஸ்டோமாட்டா எனப்படும் நுண் துளைகள் வழியே இலைகளிலிருந்து நீர் நீராவியாக வெளியேறுகிறது — இது ஆவியுயிர்ப்பு. ஆவியுயிர்ப்பு வேர்களிலிருந்து புதிய நீரை, வைக்கோல் போல, மேலே இழுக்க உதவுகிறது.',
      },
      keyPoints: [
        { en: 'Tubes in the stem carry water up', ta: 'தண்டின் குழாய்கள் நீரை மேலே கொண்டு செல்கின்றன' },
        { en: 'Stomata are tiny pores on leaves', ta: 'ஸ்டோமாட்டா இலைகளின் நுண் துளைகள்' },
        { en: 'Transpiration pulls water upward', ta: 'ஆவியுயிர்ப்பு நீரை மேலே இழுக்கிறது' },
      ],
    },
    {
      id: 'biof2-t4',
      title: { en: 'Food Storage in Plants', ta: 'தாவரங்களில் உணவு சேமிப்பு' },
      summary: {
        en: 'The glucose made by photosynthesis is changed into starch and stored in different plant parts. Potatoes store food in their stems, carrots in their roots, and seeds store food for the baby plant. This stored food also becomes the food we eat.',
        ta: 'ஒளிச்சேர்க்கையில் உருவாகும் குளுக்கோஸ் மாவுச்சத்தாக மாற்றப்பட்டு தாவரத்தின் பல்வேறு பாகங்களில் சேமிக்கப்படுகிறது. உருளைக்கிழங்கு தண்டில் உணவைச் சேமிக்கிறது; கேரட் வேர்களில்; விதைகள் சிறு தாவரத்திற்காக உணவைச் சேமிக்கின்றன. இந்த சேமித்த உணவே நாம் உண்ணும் உணவாகிறது.',
      },
      keyPoints: [
        { en: 'Glucose is stored as starch', ta: 'குளுக்கோஸ் மாவுச்சத்தாக சேமிக்கப்படுகிறது' },
        { en: 'Potatoes store food in stems', ta: 'உருளைக்கிழங்கு தண்டில் உணவைச் சேமிக்கிறது' },
        { en: 'Seeds store food for new plants', ta: 'விதைகள் புதிய தாவரங்களுக்காக உணவைச் சேமிக்கின்றன' },
      ],
    },
  ],

  // ==================== bio-f-3 Human Body & Health ====================
  'bio-f-3': [
    {
      id: 'biof3-t1',
      title: { en: 'Breathing and Circulation', ta: 'சுவாசமும் சுற்றோட்டமும்' },
      summary: {
        en: 'We breathe in oxygen with our lungs and breathe out carbon dioxide. The heart is a powerful muscle that pumps blood carrying oxygen and nutrients to every part of the body. Blood travels through tubes called blood vessels — arteries carry blood away from the heart.',
        ta: 'நுரையீரல்கள் மூலம் ஆக்ஸிஜனை உள்ளிழுத்து கார்பன் டை ஆக்சைடை வெளியேற்றுகிறோம். இதயம் ஆக்ஸிஜனும் ஊட்டச்சத்துக்களும் கொண்ட இரத்தத்தை உடலின் ஒவ்வொரு பகுதிக்கும் செலுத்தும் வலுவான தசை. இரத்தம் இரத்தக் குழாய்கள் வழியே செல்கிறது — தமனிகள் இரத்தத்தை இதயத்திலிருந்து கொண்டு செல்கின்றன.',
      },
      keyPoints: [
        { en: 'Lungs take in oxygen', ta: 'நுரையீரல்கள் ஆக்ஸிஜனை உள்ளிழுக்கின்றன' },
        { en: 'The heart pumps blood everywhere', ta: 'இதயம் இரத்தத்தை எங்கும் செலுத்துகிறது' },
        { en: 'Blood vessels carry blood', ta: 'இரத்தக் குழாய்கள் இரத்தத்தைக் கொண்டு செல்கின்றன' },
      ],
    },
    {
      id: 'biof3-t2',
      title: { en: 'Food and Digestion', ta: 'உணவும் செரிமானமும்' },
      summary: {
        en: 'Food gives our body energy and nutrients. Digestion starts in the mouth, where teeth chew and saliva softens food. The food then travels to the stomach and intestines, where nutrients are absorbed into the blood. A balanced diet includes carbohydrates, proteins, fats, vitamins, minerals, and water.',
        ta: 'உணவு நம் உடலுக்கு ஆற்றலையும் ஊட்டச்சத்துக்களையும் அளிக்கிறது. வாயில் செரிமானம் தொடங்குகிறது; பற்கள் மென்று உமிழ்நீர் உணவை மென்மையாக்குகிறது. பின்னர் உணவு வயிறு மற்றும் குடல்களுக்கு சென்று, ஊட்டச்சத்துக்கள் இரத்தத்தில் உறிஞ்சப்படுகின்றன. சமச்சீர் உணவில் கார்போஹைட்ரேட், புரதம், கொழுப்பு, வைட்டமின்கள், தாதுக்கள், நீர் ஆகியவை அடங்கும்.',
      },
      keyPoints: [
        { en: 'Digestion starts in the mouth', ta: 'செரிமானம் வாயில் தொடங்குகிறது' },
        { en: 'Nutrients are absorbed in the intestines', ta: 'குடல்களில் ஊட்டச்சத்துக்கள் உறிஞ்சப்படுகின்றன' },
        { en: 'A balanced diet keeps us healthy', ta: 'சமச்சீர் உணவு நம்மை ஆரோக்கியமாக வைக்கிறது' },
      ],
    },
    {
      id: 'biof3-t3',
      title: { en: 'Staying Healthy', ta: 'ஆரோக்கியமாக இருத்தல்' },
      summary: {
        en: 'Good health comes from daily habits: eating a balanced diet, drinking clean water, exercising, and sleeping well. Personal hygiene — bathing, washing hands before meals, and brushing teeth — prevents many diseases. Morning sunlight gives us Vitamin D, which keeps bones strong.',
        ta: 'நல்ல ஆரோக்கியம் அன்றாட பழக்கங்களிலிருந்து வருகிறது: சமச்சீர் உணவு, தூய நீர், உடற்பயிற்சி, நல்ல தூக்கம். தனிப்பட்ட சுகாதாரம் — குளித்தல், உணவுக்கு முன் கை கழுவுதல், பல் துலக்குதல் — பல நோய்களைத் தடுக்கிறது. காலை சூரிய ஒளி வைட்டமின் டி அளிக்கிறது; இது எலும்புகளை வலுவாக வைக்கிறது.',
      },
      keyPoints: [
        { en: 'Exercise and sleep keep us healthy', ta: 'உடற்பயிற்சியும் தூக்கமும் நம்மை ஆரோக்கியமாக வைக்கின்றன' },
        { en: 'Washing hands prevents disease', ta: 'கை கழுவுதல் நோய்களைத் தடுக்கிறது' },
        { en: 'Sunlight gives Vitamin D', ta: 'சூரிய ஒளி வைட்டமின் டி அளிக்கிறது' },
      ],
    },
  ],
};