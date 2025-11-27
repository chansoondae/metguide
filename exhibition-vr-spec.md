# 미술 전시 공간 디지털 트윈 VR 프로젝트 Spec

## 프로젝트 개요

실제 미술 전시 공간을 iPhone LiDAR로 스캔하여 디지털 트윈을 생성하고, 웹 기반 VR 가상 투어를 제공하는 Next.js 애플리케이션을 개발한다.

### 핵심 목표
- 실제 전시 공간의 3D 디지털 트윈 구현
- 웹 브라우저에서 접근 가능한 VR 전시 투어
- 작품별 오디오 가이드 연동
- 모바일/데스크톱/VR 헤드셋 크로스 플랫폼 지원

---

## 기술 스택

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **3D Rendering**: React Three Fiber (@react-three/fiber)
- **3D Helpers**: @react-three/drei
- **VR Support**: @react-three/xr
- **State Management**: Zustand
- **Styling**: Tailwind CSS

### 3D 데이터 처리 (별도 파이프라인)
- **LiDAR Scanning**: iPhone/iPad Pro + Polycam 또는 3D Scanner App
- **Point Cloud Processing**: Python + Open3D
- **Mesh Optimization**: Blender (수동) 또는 Python trimesh
- **Export Format**: GLB/GLTF (Draco 압축)

### Database (선택사항)
- **Supabase**: 작품 정보, 오디오 가이드 메타데이터 저장

---

## 프로젝트 구조

```
exhibition-vr/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # 랜딩 페이지
│   ├── exhibition/
│   │   ├── page.tsx                # 전시 목록
│   │   └── [exhibitionId]/
│   │       ├── page.tsx            # 전시 상세 (2D 뷰)
│   │       └── vr/
│   │           └── page.tsx        # VR 전시 투어
│   └── api/
│       ├── exhibitions/
│       │   └── route.ts            # 전시 정보 API
│       └── artworks/
│           └── route.ts            # 작품 정보 API
├── components/
│   ├── 3d/
│   │   ├── ExhibitionScene.tsx     # 메인 3D 씬
│   │   ├── ExhibitionModel.tsx     # GLB 모델 로더
│   │   ├── ArtworkHotspot.tsx      # 작품 인터랙션 포인트
│   │   ├── NavigationControls.tsx  # 이동 컨트롤
│   │   ├── VRController.tsx        # VR 컨트롤러
│   │   └── LoadingScreen.tsx       # 3D 로딩 UI
│   ├── audio/
│   │   ├── AudioGuidePlayer.tsx    # 오디오 가이드 플레이어
│   │   └── YouTubeFloatingPlayer.tsx # YouTube 플로팅 플레이어
│   ├── ui/
│   │   ├── ArtworkInfoPanel.tsx    # 작품 정보 패널
│   │   ├── ExhibitionCard.tsx      # 전시 카드
│   │   ├── MiniMap.tsx             # 미니맵 (선택)
│   │   └── ControlsHelp.tsx        # 조작 안내
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── hooks/
│   ├── useExhibition.ts            # 전시 데이터 훅
│   ├── useArtwork.ts               # 작품 데이터 훅
│   ├── useAudioGuide.ts            # 오디오 가이드 훅
│   └── useVRMode.ts                # VR 모드 상태 훅
├── stores/
│   ├── exhibitionStore.ts          # 전시 상태 관리
│   └── audioStore.ts               # 오디오 상태 관리
├── types/
│   ├── exhibition.ts               # 전시 타입 정의
│   ├── artwork.ts                  # 작품 타입 정의
│   └── hotspot.ts                  # 핫스팟 타입 정의
├── lib/
│   ├── supabase.ts                 # Supabase 클라이언트
│   └── constants.ts                # 상수 정의
├── public/
│   ├── models/
│   │   └── [exhibitionId]/
│   │       └── exhibition.glb      # 전시 공간 3D 모델
│   └── images/
│       └── artworks/               # 작품 이미지
├── scripts/
│   └── process-pointcloud/         # 포인트클라우드 처리 스크립트
│       ├── convert_to_mesh.py
│       ├── optimize_mesh.py
│       └── export_glb.py
└── docs/
    ├── scanning-guide.md           # LiDAR 스캔 가이드
    └── model-pipeline.md           # 3D 모델 파이프라인 문서
```

---

## 데이터 모델

### Exhibition (전시)
```typescript
interface Exhibition {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  modelUrl: string;           // GLB 파일 경로
  thumbnailUrl: string;
  artworks: Artwork[];
  hotspots: Hotspot[];
  createdAt: string;
  updatedAt: string;
}
```

### Artwork (작품)
```typescript
interface Artwork {
  id: string;
  exhibitionId: string;
  title: string;
  titleKo: string;
  artist: string;
  artistKo: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  descriptionKo: string;
  imageUrl: string;
  audioGuideUrl?: string;     // YouTube URL 또는 오디오 파일
  audioGuideId?: string;      // YouTube Video ID
  position: [number, number, number];  // 3D 공간 내 위치
  rotation?: [number, number, number];
}
```

### Hotspot (인터랙션 포인트)
```typescript
interface Hotspot {
  id: string;
  exhibitionId: string;
  artworkId?: string;         // 연결된 작품 (선택)
  type: 'artwork' | 'info' | 'navigation';
  position: [number, number, number];
  label: string;
  labelKo: string;
  description?: string;
  targetPosition?: [number, number, number];  // navigation 타입용
}
```

---

## 핵심 컴포넌트 명세

### 1. ExhibitionScene.tsx
메인 3D 씬 컴포넌트

**Props:**
```typescript
interface ExhibitionSceneProps {
  exhibitionId: string;
  modelUrl: string;
  hotspots: Hotspot[];
  onHotspotClick: (hotspot: Hotspot) => void;
  enableVR?: boolean;
}
```

**기능:**
- Canvas 및 기본 씬 설정 (카메라, 조명, 환경)
- GLB 모델 로드 및 렌더링
- 핫스팟 배치 및 인터랙션
- OrbitControls / FirstPersonControls 전환
- VR 모드 지원 (옵션)

**구현 요구사항:**
```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress, Html } from '@react-three/drei';
import { VRButton, XR, Controllers } from '@react-three/xr';
import { Suspense } from 'react';

// Suspense fallback으로 로딩 상태 표시
// Environment preset="apartment" 또는 커스텀 HDRI
// 카메라 초기 위치: 전시 공간 입구 기준
// enableDamping으로 부드러운 컨트롤
```

### 2. ExhibitionModel.tsx
GLB 모델 로더 컴포넌트

**Props:**
```typescript
interface ExhibitionModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}
```

**구현 요구사항:**
```tsx
import { useGLTF } from '@react-three/drei';

// useGLTF 훅으로 GLB 로드
// useGLTF.preload()로 프리로딩 지원
// 그림자 castShadow/receiveShadow 설정
// 메시 최적화 (frustumCulled 등)
```

### 3. ArtworkHotspot.tsx
작품 인터랙션 포인트 컴포넌트

**Props:**
```typescript
interface ArtworkHotspotProps {
  hotspot: Hotspot;
  isSelected: boolean;
  onClick: () => void;
}
```

**기능:**
- 시각적 마커 (구체 또는 아이콘)
- 호버 시 레이블 표시 (Html 컴포넌트)
- 클릭 시 상위 컴포넌트로 이벤트 전달
- 선택 상태에 따른 시각적 피드백
- 애니메이션 (펄스 효과 등)

**구현 요구사항:**
```tsx
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// useState로 hover 상태 관리
// useFrame으로 펄스 애니메이션
// mesh onClick, onPointerOver, onPointerOut
// Html center로 레이블 렌더링
// 선택 시 색상/크기 변경
```

### 4. AudioGuidePlayer.tsx
오디오 가이드 플레이어 컴포넌트

**Props:**
```typescript
interface AudioGuidePlayerProps {
  artwork: Artwork | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}
```

**기능:**
- YouTube 임베드 플레이어 또는 HTML5 Audio
- 플로팅 UI (3D 씬 위에 오버레이)
- 재생/일시정지/닫기 컨트롤
- 작품 정보 표시
- 드래그 가능한 위치

**구현 요구사항:**
```tsx
// 기존 아트프렌즈 YouTube 플로팅 플레이어 로직 재사용
// position: fixed로 화면 하단 고정
// 최소화/최대화 토글
// 작품 변경 시 자동 재생 옵션
```

### 5. NavigationControls.tsx
이동 컨트롤 컴포넌트

**기능:**
- 모드 전환: Orbit(궤도) / Walk(걷기) / Fly(비행)
- 터치/마우스 지원
- 키보드 WASD 이동 (Walk 모드)
- 텔레포트 (VR 모드)

**구현 요구사항:**
```tsx
import { OrbitControls, PointerLockControls, FlyControls } from '@react-three/drei';

// 모드에 따라 다른 컨트롤 렌더링
// minDistance/maxDistance로 줌 제한
// enablePan 옵션
// target 설정으로 초점 지정
```

---

## 페이지 명세

### 1. 랜딩 페이지 (app/page.tsx)
- 서비스 소개
- 주요 전시 미리보기
- VR 체험 안내

### 2. 전시 목록 (app/exhibition/page.tsx)
- 전시 카드 그리드
- 필터링 (진행중/종료)
- 검색

### 3. 전시 상세 (app/exhibition/[exhibitionId]/page.tsx)
- 전시 정보 표시
- 작품 목록 (2D 갤러리 뷰)
- VR 투어 진입 버튼
- 공유 기능

### 4. VR 전시 투어 (app/exhibition/[exhibitionId]/vr/page.tsx)
- 전체 화면 3D 씬
- 핫스팟 기반 작품 탐색
- 오디오 가이드 연동
- VR 헤드셋 지원
- 종료/나가기 버튼

---

## 3D 데이터 파이프라인

### 1단계: LiDAR 스캔
```
도구: iPhone/iPad Pro + Polycam 앱
출력: PLY 또는 OBJ 파일 (포인트클라우드/메쉬)

스캔 가이드라인:
- 조명 균일하게 유지
- 천천히, 일정한 속도로 이동
- 겹치는 영역 충분히 확보
- 반사면/투명면 주의
- 전시 공간 전체 + 작품 위치 집중 스캔
```

### 2단계: 포인트클라우드 처리 (Python)
```python
# scripts/process-pointcloud/convert_to_mesh.py

import open3d as o3d
import numpy as np

def process_pointcloud(input_path: str, output_path: str):
    """
    포인트클라우드를 메쉬로 변환
    
    Args:
        input_path: PLY/PCD 파일 경로
        output_path: 출력 OBJ 파일 경로
    """
    # 1. 포인트클라우드 로드
    pcd = o3d.io.read_point_cloud(input_path)
    
    # 2. 다운샘플링 (voxel_size 조절로 디테일 레벨 설정)
    pcd_down = pcd.voxel_down_sample(voxel_size=0.02)
    
    # 3. 노말 계산
    pcd_down.estimate_normals(
        search_param=o3d.geometry.KDTreeSearchParamHybrid(
            radius=0.1, 
            max_nn=30
        )
    )
    
    # 4. 노말 방향 정규화
    pcd_down.orient_normals_consistent_tangent_plane(k=15)
    
    # 5. Poisson Surface Reconstruction
    mesh, densities = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
        pcd_down, 
        depth=9,
        width=0,
        scale=1.1,
        linear_fit=False
    )
    
    # 6. 저밀도 영역 제거 (노이즈 정리)
    densities = np.asarray(densities)
    density_threshold = np.quantile(densities, 0.01)
    vertices_to_remove = densities < density_threshold
    mesh.remove_vertices_by_mask(vertices_to_remove)
    
    # 7. 메쉬 정리
    mesh.remove_degenerate_triangles()
    mesh.remove_duplicated_triangles()
    mesh.remove_duplicated_vertices()
    mesh.remove_non_manifold_edges()
    
    # 8. 노말 재계산
    mesh.compute_vertex_normals()
    
    # 9. 저장
    o3d.io.write_triangle_mesh(output_path, mesh)
    
    return mesh

if __name__ == "__main__":
    import sys
    process_pointcloud(sys.argv[1], sys.argv[2])
```

### 3단계: 메쉬 최적화
```python
# scripts/process-pointcloud/optimize_mesh.py

import open3d as o3d

def optimize_mesh(input_path: str, output_path: str, target_triangles: int = 100000):
    """
    메쉬 최적화 (폴리곤 수 감소)
    
    Args:
        input_path: 입력 메쉬 파일
        output_path: 출력 메쉬 파일
        target_triangles: 목표 삼각형 수
    """
    mesh = o3d.io.read_triangle_mesh(input_path)
    
    # 단순화 (Quadric Decimation)
    mesh_simplified = mesh.simplify_quadric_decimation(
        target_number_of_triangles=target_triangles
    )
    
    # 스무딩 (선택)
    mesh_smoothed = mesh_simplified.filter_smooth_taubin(
        number_of_iterations=10
    )
    
    mesh_smoothed.compute_vertex_normals()
    o3d.io.write_triangle_mesh(output_path, mesh_smoothed)
    
    return mesh_smoothed
```

### 4단계: GLB 변환 및 압축
```python
# scripts/process-pointcloud/export_glb.py

import trimesh
import subprocess

def export_to_glb(input_path: str, output_path: str, compress: bool = True):
    """
    OBJ를 GLB로 변환 및 Draco 압축
    
    Args:
        input_path: OBJ 파일 경로
        output_path: GLB 파일 경로
        compress: Draco 압축 여부
    """
    # trimesh로 변환
    mesh = trimesh.load(input_path)
    mesh.export(output_path.replace('.glb', '_uncompressed.glb'))
    
    if compress:
        # gltf-pipeline으로 Draco 압축
        subprocess.run([
            'npx', 'gltf-pipeline',
            '-i', output_path.replace('.glb', '_uncompressed.glb'),
            '-o', output_path,
            '--draco.compressionLevel=7'
        ])
```

### 전체 파이프라인 실행
```bash
# 1. 환경 설정
pip install open3d numpy trimesh
npm install -g gltf-pipeline

# 2. 포인트클라우드 → 메쉬 변환
python scripts/process-pointcloud/convert_to_mesh.py \
  input/exhibition_scan.ply \
  output/exhibition_raw.obj

# 3. 메쉬 최적화
python scripts/process-pointcloud/optimize_mesh.py \
  output/exhibition_raw.obj \
  output/exhibition_optimized.obj \
  --target-triangles 100000

# 4. GLB 변환 및 압축
python scripts/process-pointcloud/export_glb.py \
  output/exhibition_optimized.obj \
  public/models/exhibition1/exhibition.glb

# 또는 Blender CLI로 처리
blender --background --python scripts/blender_export.py -- \
  input.obj output.glb
```

---

## 성능 최적화 가이드라인

### 3D 모델
- GLB 파일 크기: 5MB 이하 권장 (최대 20MB)
- 폴리곤 수: 100,000 ~ 500,000 삼각형
- 텍스처: 2048x2048 이하, WebP 또는 압축 JPEG
- Draco 압축 필수

### React Three Fiber
```tsx
// 성능 최적화 설정
<Canvas
  gl={{ 
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  }}
  performance={{ min: 0.5 }}  // 적응형 성능
  dpr={[1, 2]}                 // 픽셀 비율 제한
>
  {/* 프러스텀 컬링 */}
  <primitive object={scene} frustumCulled />
  
  {/* LOD (Level of Detail) - 선택 */}
  <LOD distances={[0, 10, 25]}>
    <HighDetailModel />
    <MediumDetailModel />
    <LowDetailModel />
  </LOD>
</Canvas>
```

### 로딩 최적화
- useGLTF.preload() 사용
- Suspense로 점진적 로딩
- 모델 청크 분할 (대규모 전시)
- Progressive loading 구현

---

## 접근성 고려사항

### VR 모드
- 텔레포트 이동 지원 (멀미 방지)
- 좌석 모드 옵션
- 컨트롤러 진동 피드백

### 일반 모드
- 키보드 네비게이션 지원
- 스크린 리더 대체 텍스트
- 고대비 모드 옵션
- 자막 (오디오 가이드)

---

## 테스트 체크리스트

### 기능 테스트
- [ ] GLB 모델 로딩 정상
- [ ] 핫스팟 클릭 동작
- [ ] 오디오 가이드 재생
- [ ] 카메라 컨트롤 (Orbit/Walk)
- [ ] VR 모드 진입/종료
- [ ] VR 컨트롤러 인터랙션

### 성능 테스트
- [ ] 초기 로딩 시간 < 5초
- [ ] 60 FPS 유지 (데스크톱)
- [ ] 30 FPS 유지 (모바일)
- [ ] 메모리 사용량 모니터링

### 디바이스 테스트
- [ ] Chrome/Firefox/Safari (데스크톱)
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Meta Quest 브라우저

---

## 개발 우선순위

### Phase 1: MVP (1-2주)
1. Next.js 프로젝트 셋업
2. 기본 3D 씬 구현 (ExhibitionScene)
3. GLB 모델 로딩 (ExhibitionModel)
4. OrbitControls 네비게이션
5. 정적 핫스팟 구현

### Phase 2: 인터랙션 (1주)
1. 핫스팟 클릭 이벤트
2. 작품 정보 패널
3. 오디오 가이드 연동
4. 상태 관리 (Zustand)

### Phase 3: VR 지원 (1주)
1. @react-three/xr 통합
2. VR 컨트롤러 구현
3. 텔레포트 이동
4. VR UI 조정

### Phase 4: 최적화 및 배포 (1주)
1. 성능 최적화
2. 로딩 UX 개선
3. 에러 핸들링
4. Vercel 배포

---

## 환경 변수

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 선택
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
```

---

## 참고 자료

### 공식 문서
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [@react-three/xr](https://github.com/pmndrs/xr)
- [Open3D](http://www.open3d.org/docs/release/)
- [Next.js App Router](https://nextjs.org/docs/app)

### 튜토리얼
- [R3F 시작하기](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [GLTF 모델 로딩](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [WebXR with R3F](https://docs.pmnd.rs/xr)

### 도구
- [gltf.pmnd.rs](https://gltf.pmnd.rs/) - GLTF → JSX 변환
- [Polycam](https://poly.cam/) - LiDAR 스캔 앱
- [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) - GLTF 최적화
