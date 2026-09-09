/**
 * Concept Maps Dataset Validator
 * Verifies dataset integrity, graph reference validity, localization completeness,
 * and semantic constraints. Ensures a malformed map never crashes the app.
 */

import {
  ConceptMap,
  ConceptMapNode,
  ConceptMapSubjectId,
  ConceptNodeType,
  RelationshipType,
} from './conceptMaps.types';

export const VALID_SUBJECTS: ConceptMapSubjectId[] = [
  'physics',
  'chemistry',
  'biology',
  'space',
  'environment',
  'human-body',
];

export const VALID_GRADE_GROUPS = ['junior', 'secondary', 'senior'];
export const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

export const VALID_NODE_TYPES: ConceptNodeType[] = [
  'root',
  'concept',
  'cause',
  'effect',
  'input',
  'process',
  'output',
  'example',
  'definition',
  'related',
];

export const VALID_RELATIONSHIPS: RelationshipType[] = [
  'causes',
  'produces',
  'requires',
  'contains',
  'partOf',
  'leadsTo',
  'relatedTo',
  'exampleOf',
  'dependsOn',
];

export interface ValidationIssue {
  mapId: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  totalMaps: number;
  issues: ValidationIssue[];
}

export function validateConceptMap(map: ConceptMap): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const mapId = map.id || 'unknown';

  // ID validation
  if (!map.id || typeof map.id !== 'string' || map.id.trim().length === 0) {
    issues.push({ mapId, field: 'id', message: 'Map ID must be a non-empty string' });
  }

  // Subject validation
  if (!VALID_SUBJECTS.includes(map.subject)) {
    issues.push({ mapId, field: 'subject', message: `Invalid subject: ${map.subject}` });
  }

  // Grade group validation
  if (!VALID_GRADE_GROUPS.includes(map.gradeGroup)) {
    issues.push({ mapId, field: 'gradeGroup', message: `Invalid gradeGroup: ${map.gradeGroup}` });
  }

  // Difficulty
  if (!VALID_DIFFICULTIES.includes(map.difficulty)) {
    issues.push({ mapId, field: 'difficulty', message: `Invalid difficulty: ${map.difficulty}` });
  }

  // Estimated minutes
  if (typeof map.estimatedMinutes !== 'number' || map.estimatedMinutes < 1 || map.estimatedMinutes > 10) {
    issues.push({ mapId, field: 'estimatedMinutes', message: 'Estimated minutes must be between 1 and 10' });
  }

  // Localization - Title & Subtitle & Description & Key Takeaway
  if (!map.title?.en?.trim() || !map.title?.ta?.trim()) {
    issues.push({ mapId, field: 'title', message: 'Title must be non-empty in EN and TA' });
  }
  if (!map.subtitle?.en?.trim() || !map.subtitle?.ta?.trim()) {
    issues.push({ mapId, field: 'subtitle', message: 'Subtitle must be non-empty in EN and TA' });
  }
  if (!map.description?.en?.trim() || !map.description?.ta?.trim()) {
    issues.push({ mapId, field: 'description', message: 'Description must be non-empty in EN and TA' });
  }
  if (!map.keyTakeaway?.en?.trim() || !map.keyTakeaway?.ta?.trim()) {
    issues.push({ mapId, field: 'keyTakeaway', message: 'Key takeaway must be non-empty in EN and TA' });
  }

  // Nodes validation
  if (!Array.isArray(map.nodes) || map.nodes.length < 3) {
    issues.push({ mapId, field: 'nodes', message: 'Map must contain at least 3 nodes' });
  } else {
    const nodeIds = new Set<string>();
    let hasRoot = false;
    let hasKeyNode = false;

    map.nodes.forEach((node, idx) => {
      const nodeId = node.id || `node-${idx}`;

      // Node ID uniqueness
      if (nodeIds.has(nodeId)) {
        issues.push({ mapId, field: `nodes[${idx}].id`, message: `Duplicate node ID: ${nodeId}` });
      }
      nodeIds.add(nodeId);

      // Node type
      if (!VALID_NODE_TYPES.includes(node.type)) {
        issues.push({ mapId, field: `nodes[${idx}].type`, message: `Invalid node type: ${node.type}` });
      }
      if (node.type === 'root') hasRoot = true;
      if (node.keyNode) hasKeyNode = true;

      // Position
      if (
        !node.position ||
        typeof node.position.x !== 'number' ||
        typeof node.position.y !== 'number' ||
        isNaN(node.position.x) ||
        isNaN(node.position.y)
      ) {
        issues.push({ mapId, field: `nodes[${idx}].position`, message: 'Node position must have valid x and y numbers' });
      }

      // Title & Labels
      if (!node.title?.en?.trim() || !node.title?.ta?.trim()) {
        issues.push({ mapId, field: `nodes[${idx}].title`, message: 'Node title must be non-empty in EN and TA' });
      }
      if (!node.shortLabel?.en?.trim() || !node.shortLabel?.ta?.trim()) {
        issues.push({ mapId, field: `nodes[${idx}].shortLabel`, message: 'Node shortLabel must be non-empty in EN and TA' });
      }
      if (!node.definition?.en?.trim() || !node.definition?.ta?.trim()) {
        issues.push({ mapId, field: `nodes[${idx}].definition`, message: 'Node definition must be non-empty in EN and TA' });
      }
      if (!node.example?.en?.trim() || !node.example?.ta?.trim()) {
        issues.push({ mapId, field: `nodes[${idx}].example`, message: 'Node example must be non-empty in EN and TA' });
      }
    });

    if (!hasRoot) {
      issues.push({ mapId, field: 'nodes', message: 'Map must contain at least one root node' });
    }
    if (!hasKeyNode) {
      issues.push({ mapId, field: 'nodes', message: 'Map must contain at least one key node for completion' });
    }

    // Connections validation
    if (!Array.isArray(map.connections) || map.connections.length === 0) {
      issues.push({ mapId, field: 'connections', message: 'Map must contain at least one connection' });
    } else {
      const connIds = new Set<string>();

      map.connections.forEach((conn, idx) => {
        const connId = conn.id || `conn-${idx}`;

        if (connIds.has(connId)) {
          issues.push({ mapId, field: `connections[${idx}].id`, message: `Duplicate connection ID: ${connId}` });
        }
        connIds.add(connId);

        // From node exists
        if (!nodeIds.has(conn.fromNodeId)) {
          issues.push({
            mapId,
            field: `connections[${idx}].fromNodeId`,
            message: `Connection references non-existent fromNodeId: ${conn.fromNodeId}`,
          });
        }

        // To node exists
        if (!nodeIds.has(conn.toNodeId)) {
          issues.push({
            mapId,
            field: `connections[${idx}].toNodeId`,
            message: `Connection references non-existent toNodeId: ${conn.toNodeId}`,
          });
        }

        // Relationship type
        if (!VALID_RELATIONSHIPS.includes(conn.relationship)) {
          issues.push({
            mapId,
            field: `connections[${idx}].relationship`,
            message: `Invalid relationship type: ${conn.relationship}`,
          });
        }
      });
    }
  }

  return issues;
}

export function validateConceptMapsCatalog(maps: ConceptMap[]): ValidationResult {
  const issues: ValidationIssue[] = [];
  const seenMapIds = new Set<string>();

  for (const map of maps) {
    if (seenMapIds.has(map.id)) {
      issues.push({ mapId: map.id, field: 'id', message: `Duplicate map ID detected: ${map.id}` });
    }
    seenMapIds.add(map.id);

    const mapIssues = validateConceptMap(map);
    issues.push(...mapIssues);
  }

  return {
    isValid: issues.length === 0,
    totalMaps: maps.length,
    issues,
  };
}
