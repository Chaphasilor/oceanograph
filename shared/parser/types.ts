export enum Platform {
    linux = "Linux",
    windows = "Windows",
    macos = "MacOS",
    ios = "iOS",
    android = "Android",
    web = "Web",
}
export enum Language {
    dart = "Dart",
    flutter = "Flutter",
    html = "HTML",
    js = "Javascript",
    css = "CSS",
    swift = "Swift",
    java = "Java",
    kotlin = "Kotlin",
}
export enum TandemManifestKinds {
    stable = "stable",
    beta = "beta",
}

export enum URLType {
    github = "Github",
    mastodon = "Mastodon",
    discord = "Discord",
    generic = "Generic",
    googlePlay = "Google Play",
    appStore = "App Store",
    testflight = "Test Flight",
    fDroid = "F-Droid",
    flatpak = "Flatpak",
    aur = "AUR",
}
/**
 * A Capability is anything which requires server communication
 */
export enum Capabilities {
    playOn_report = "Report Play-State via. Play On",
    playOn_controlled = "Being Controlled by Play On",
    playOn_controller = "Controlling others via. Play On",
    transcoding = "Transcoding",
    customCSS = "Custom CSS",

    edit_metadata_text = "Modify Text Metadata",
    edit_metadata_image = "Modify Image Metadata",

    format_audio_FLAC = "FLAC",
    format_audio_MP3 = "MP3",
    format_audio_AAC = "AAC",
    format_audio_AC3 = "AC3",
    format_audio_EAC3 = "EAC3",
    format_audio_VORBIS = "VORBIS",
    format_audio_DTS = "DTS",
    format_audio_OPUS = "OPUS",
    format_audio_ALAC = "ALAC",

    format_video_MPEG4_Part_2SP = "MPEG-4 Part 2/SP",
    format_video_MPEG4_Part_2ASP = "MPEG-4 Part 2/ASP",
    format_video_H264_8Bit = "H.264 8Bit",
    format_video_H264_10Bit = "H.264 10Bit",
    format_video_H265_8Bit = "H.265 8Bit",
    format_video_H265_10Bit = "H.265 10Bit",
    format_video_VP9 = "VP9",
    format_video_AV1 = "AV1",

    library_type_books = "Books",
    library_type_movie = "Movies",
    library_type_music = "Music",
    library_type_music_video = "Music Videos",
    library_type_shows = "Shows",
    library_type_videos_photos = "Videos and Photos",
    library_type_movies_shows = "Mixed Movies and Shows",

    lyrics = "Lyrics",
    syncLyrics = "Synced Lyrics",
    wSyncLyrics = "Word Synced Lyrics",
    subtitles = "subtitles",

    administration_settings = "Edit Server Settings",
    administration_users = "Manage Users",
    administration_plugins = "Manage Plugins",
    administration_logs = "View Server Logs",
}
export const CapabilityCategories = {
    "Play On": [
        Capabilities.playOn_report,
        Capabilities.playOn_controlled,
        Capabilities.playOn_controller,
    ],
    "Metadata": [
        Capabilities.edit_metadata_image,
        Capabilities.edit_metadata_text,
    ],
    "Lyrics": [
        Capabilities.lyrics,
        Capabilities.syncLyrics,
        Capabilities.wSyncLyrics,
    ],
    "Library Types": [
        Capabilities.library_type_books,
        Capabilities.library_type_movie,
        Capabilities.library_type_music,
        Capabilities.library_type_music_video,
        Capabilities.library_type_shows,
        Capabilities.library_type_videos_photos,
        Capabilities.library_type_movies_shows,
    ],
    "Video Formats": [
        Capabilities.format_video_MPEG4_Part_2SP,
        Capabilities.format_video_MPEG4_Part_2ASP,
        Capabilities.format_video_H264_8Bit,
        Capabilities.format_video_H264_10Bit,
        Capabilities.format_video_H265_8Bit,
        Capabilities.format_video_H265_10Bit,
        Capabilities.format_video_VP9,
        Capabilities.format_video_AV1,
    ],
    "Audio Formats": [
        Capabilities.format_audio_FLAC,
        Capabilities.format_audio_MP3,
        Capabilities.format_audio_AAC,
        Capabilities.format_audio_AC3,
        Capabilities.format_audio_EAC3,
        Capabilities.format_audio_VORBIS,
        Capabilities.format_audio_DTS,
        Capabilities.format_audio_OPUS,
        Capabilities.format_audio_ALAC,
    ],
};

/**
 * A Feature is anything that has nothing to do with server communication
 */
export enum Features {
    offline_audio = "Offline Audio Playback",
    offline_video = "Offline Video Playback",
    offline_cache = "View Library Offline",
    offline_modifications = "Modify Items Offline (metadata/likes)",
    offline_playback_sync = "Report Offline Playbacks to Server",

    screen_reader = "Screen Reader",
    high_contrast_theme = "High Contrast Theme",
    theme_dark = "Dark Theme",
    theme_light = "Light Theme",

    carPlay = "Apple CarPlay",
    androidAuto = "Android Auto",
    smartWatch = "smartWatch",

    sleep_timer = "Sleep Timer",
    client_discovery = "Find Server in network",
    logs = "Locally accessible Logs",
    dynamic_theme = "Dynamic/Adaptive Theme",
    quick_connect = "Quick Connect",
}
export const FeatureCategories = {
    "Offline Integration": [
        Features.offline_audio,
        Features.offline_video,
        Features.offline_cache,
        Features.offline_modifications,
        Features.offline_playback_sync,
    ],
    "Accessibility": [
        Features.screen_reader,
        Features.high_contrast_theme,
    ],
    "External Devices": [
        Features.carPlay,
        Features.androidAuto,
        Features.smartWatch,
    ],
    "Quality of Life": [
        Features.sleep_timer,
        Features.client_discovery,
        Features.logs,
        Features.dynamic_theme,
        Features.quick_connect,
    ],
};

export type Capability = {
    comment?: string;
    /** When Since is missing then no exact version is known */
    since?: Version;
};
export type Version = string;
export type Name = string;
export type Pricing = string;
export type ManifestIndex = { [fileName: string]: Manifest };
export type RawManifestIndex = { [fileName: string]: object };
export type valueTypes =
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";

/**
 * Custom URL / URL Wrapper
 */
export interface cURL {
    type: URLType;
    url: URL;
}
export interface Author {
    name: Name;
    urls: cURL[];
}
export interface Release {
    version: Version;
    at: Date;
}

export interface TandemManifest {
    manifest: string;
    kind: TandemManifestKinds;
}

export interface Manifest {
    updatedAt: Date;

    name: string;
    official: boolean;
    description: string;
    url: cURL;
    downloads: cURL[];

    authors: Author[];
    community: cURL[];

    releases: Release[];
    /**
     * value = version ; true = version unknown
     * missing entry = not supported
     */
    platforms: { [key in Platform]?: Version | true };
    license: string;
    openSource: boolean;
    languages: Language[];
    cost: Pricing;

    minServer?: Version;
    maxServer?: Version;

    tandemManifest?: TandemManifest;

    capabilities: { [key in Capabilities]?: Capability };
    features: { [key in Features]?: Capability };
}
